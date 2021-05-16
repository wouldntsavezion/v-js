import k from "../db/knex";
import User from "../models/User";
import decrypt from "../auth/decrypt";
import g from "../utils/guard";

export async function authenticate(username:string, password:string): Promise<boolean> {
	g(!!username, "No username provided to `authenticate` method.");
	g(!!password, "No password provided to `authenticate` method.");

	let auth = false;
	await k
		.first("username", "password")
		.from("users")
		.where("username", username)
		.then(function(row:User) {
			if(!row) auth = false;
			auth = password === decrypt(row.password)
		}).catch(function(error:Error) {
			console.error(error);
			auth = false;
		});

	return auth;
}