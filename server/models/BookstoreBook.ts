import Book from "./Book";
import Bookstore from "./Bookstore";

export enum BookstoreBookStatus {
	IN_STOCK = "BOOKSTORE_BOOK_STATUS_IN_STOCK",
	OUT_OF_STOCK = "BOOKSTORE_BOOK_STATUS_OUT_OF_STOCK",
}

export default interface User {
	id: number,
	id_bookstore: Pick<Bookstore, "id">,
	id_book: Pick<Book, "id">,
	quantity: number,
	status: BookstoreBookStatus,
}