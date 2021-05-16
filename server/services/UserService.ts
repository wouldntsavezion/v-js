import k from "../db/knex";
import User from "../models/User";
import decrypt from "../auth/decrypt";
import g, { GuardError } from "../utils/guard";

export async function authenticate(username:string, password:string): Promise<boolean> {
	try {
		g([
			[!!username, "No username provided to `authenticate` method."],
			[!!password, "No password provided to `authenticate` method."],
		]);
	} catch (e) {
		if(e instanceof GuardError) {
			return false;
		}
	}

	let auth = false;
	await k
		.first("username", "password")
		.from("users")
		.where("username", username)
		.then(function(row:User) {
			auth = !!row && password === decrypt(row.password)
		}).catch(function(error:Error) {
			console.error(error);
			auth = false;
		});

	return auth;
}