import k from "../db/knex";
import BookstoreBook, { BookstoreBookStatus } from "../models/BookstoreBook";
import trx from "../utils/knexTransactionWithSuccess";

export async function updateBookStatuses(): Promise<boolean> {
	return await trx(
		k.raw("UPDATE `bookstore_books` SET `status` = ( CASE WHEN `quantity` > 0 then \"" + BookstoreBookStatus.IN_STOCK + "\" WHEN `quantity` <= 0 THEN \"" + BookstoreBookStatus.OUT_OF_STOCK + "\" END)")
	);
}