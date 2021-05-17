import k from "../db/knex";
import g, { GuardError } from "../utils/guard";
import Book from "../models/Book";
import BookstoreBook from "../models/BookstoreBook";
import quickdate from "../utils/quickdate";

export async function fetch(bookid: number, storeid?:number) : Promise<Pick<Book, "id" | "isbn" | "name" | "author" | "date"> & Pick<BookstoreBook, "quantity" | "status"> | null> {
	try {
		g([
			[!!bookid, "No bookid provided to `fetch` method."],
		]);
	} catch (e) {
		if(e instanceof GuardError) {
			return null;
		}
	}

	let book:Pick<Book, "id" | "isbn" | "name" | "author" | "date"> & Pick<BookstoreBook, "quantity" | "status"> | null = null;

	let q = k("books")
		.where("books.id", "=", bookid);

	if(storeid) q
		.join("bookstore_books", "books.id", "=", "bookstore_books.id_book")
		.andWhere("bookstore_books.id_bookstore", "=", storeid)
		.select("books.id", "books.isbn", "books.name", "books.author", "books.date", "bookstore_books.quantity", "bookstore_books.status");
	else q
		.select("books.id", "books.isbn", "books.name", "books.author", "books.date");

	await q
		.then(function(row:typeof book) {
			book = row;
		})
		.catch(function(e:Error) {
			console.error(e);
		});

	return book;
}

export async function create(book:Omit<Book, "id">) : Promise<boolean> {
	let success = false;

	await k("books")
		.insert({
			isbn: book.isbn,
			name: book.name,
			author: book.author,
			date: quickdate(book.date),
		})
		.then((r:any) => {
			success = true;
		})
		.catch((e:Error) => {
			console.error(e);
			success = false;
		});

	return success;
}