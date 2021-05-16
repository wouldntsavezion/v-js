import Book from "./Book";
import Bookstore from "./Bookstore";

export default interface User {
	id: number,
	id_bookstore: Pick<Bookstore, "id">,
	id_book: Pick<Book, "id">,
}