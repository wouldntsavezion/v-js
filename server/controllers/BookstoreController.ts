import express from "express";
import g, { GuardError } from "../utils/guard";
import * as service from "../services/BookstoreService";

export default class BookstoreController {
	public static async fetch(req:express.Request, res:express.Response) {
		try {
			g([
				[!!req.query.bookid, "No bookid provided to `fetch` route."],
			]);
		} catch (e) {
			if(e instanceof GuardError) {
				res.send(e.message);
				res.status(400).end();
				return false;
			}
		}

		let bookid = parseInt(req.query.bookid as string);
		let storeid = req.query.storeid ? parseInt(req.query.storeid as string) : null;

		let book = storeid ? await service.fetch(bookid, storeid) : await service.fetch(bookid);

		res.send(JSON.stringify(book));
	}

	public static async create(req:express.Request, res:express.Response) {
		try {
			g([
				[!!req.body.isbn, "No isbn provided to `create` route."],
				[req.body.isbn.length == 13, "Invalid isbn provided to `create` route."],
				[!!req.body.name, "No name provided to `create` route."],
				[!!req.body.author, "No author provided to `create` route."],
				[!!req.body.date, "No date provided to `create` route."],
			]);
		} catch (e) {
			if(e instanceof GuardError) {
				res.send(e.message);
				res.status(400).end();
				return false;
			}
		}

		const success = await service.create({
			isbn: req.body.isbn,
			name: req.body.name,
			author: req.body.author,
			date: new Date(Date.parse(req.body.date))
		});

		res.status(success ? 201 : 409).end();
	}

	public static update(req:express.Request, res:express.Response) {
		res.send("fetch")
	}

	public static delete(req:express.Request, res:express.Response) {
		res.send("fetch")
	}
}