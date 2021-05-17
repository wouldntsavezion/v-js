import k from "../db/knex";
import g, { GuardError } from "../utils/guard";
import Book from "../models/Book";
import BookstoreBook, { BookstoreBookStatus } from "../models/BookstoreBook";
import quickdate from "../utils/quickdate";
import trx from "../utils/knexTransactionWithSuccess";

// GET

export async function fetch(bookid: number, storeid?:number) : Promise<Pick<Book, "id" | "isbn" | "name" | "author" | "date"> & Pick<BookstoreBook, "quantity" | "status"> | null> {
	let book:Pick<Book, "id" | "isbn" | "name" | "author" | "date"> & Pick<BookstoreBook, "quantity" | "status"> | null = null;

	let q = k("books")
		.where("books.id", "=", bookid);

	if(storeid) q
		.join("bookstore_books", "books.id", "=", "bookstore_books.id_book")
		.andWhere("bookstore_books.id_bookstore", "=", storeid)
		.first("books.id", "books.isbn", "books.name", "books.author", "books.date", "bookstore_books.quantity", "bookstore_books.status");
	else q
		.first("books.id", "books.isbn", "books.name", "books.author", "books.date");

	await q
		.then((row:typeof book) => {
			book = row;
		})
		.catch((e:Error) => {
			console.error(e);
		});

	return book;
}

// POST

export async function create(book:Omit<Book, "id">) : Promise<boolean> {
	return await trx(k("books")
		.insert({
			isbn: book.isbn,
			name: book.name,
			author: book.author,
			date: quickdate(book.date),
		})
	);
}

export async function update(bookid: number, storeid: number, quantity: number) : Promise<boolean> {
	let bookstore_book:BookstoreBook | null = null;

	await k("bookstore_books")
		.first("id_book", "id_bookstore", "quantity", "status")
		.where({
			id_book: bookid,
			id_bookstore: storeid,
		})
		.then((row:typeof bookstore_book) => {
			bookstore_book = row;
		})
		.catch((e:Error) => {
			// No entry
		});

	const status = quantity > 0 ? BookstoreBookStatus.IN_STOCK : BookstoreBookStatus.OUT_OF_STOCK;

	return bookstore_book ? trx(
		k("bookstore_books")
			.where({
				id_book: bookid,
				id_bookstore: storeid,
			})
			.update({
				quantity: quantity,
				status: status,
			})
	) : trx(
		k("bookstore_books")
			.insert({
				id_book: bookid,
				id_bookstore: storeid,
				quantity: quantity,
				status: status,
			})
	);
}

export async function del(bookid: number) : Promise<boolean> {
	const book = await fetch(bookid);
	if(!book) return false;

	return await trx(k("books")
		.where("books.id", "=", bookid)
		.del()
	);
}