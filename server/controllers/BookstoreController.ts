import express from "express";
import g, { GuardError } from "../utils/guard";

export default class BookstoreController {
	public static fetch(req:express.Request, res:express.Response) {
		try {
			g([
				[!!req.query.isbn, "No isbn provided to `fetch` route."],
				[!!req.query.isbn && req.query.isbn.length == 13, "isbn provided to `fetch` route is invalid."],
			]);
		} catch (e) {
			if(e instanceof GuardError) {
				res.send(e.message);
				return false;
			}
		}

		res.send("fetch")
	}

	public static create(req:express.Request, res:express.Response) {
		res.send("fetch")
	}

	public static update(req:express.Request, res:express.Response) {
		res.send("fetch")
	}

	public static delete(req:express.Request, res:express.Response) {
		res.send("fetch")
	}
}