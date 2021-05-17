import k from "../db/knex";
import { Knex } from "knex";

export default async (q:Knex.QueryBuilder):Promise<boolean> => {
	let success = false;

	await k.transaction(async (trx:Knex.Transaction) => {
		return await q
			.transacting(trx)
			.then(trx.commit)
			.catch(trx.rollback);
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