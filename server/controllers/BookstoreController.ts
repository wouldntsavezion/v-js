import express from "express";
import g, { GuardError } from "../utils/guard";
import * as service from "../services/BookstoreService";
import render from "../utils/render";

export default class BookstoreController {
	public static async fetch(req:express.Request, res:express.Response) {
		try {
			g([
				[!!req.query.bookid, "No bookid provided to `fetch` route."],
			]);
		} catch (e) {
			if(e instanceof GuardError) {
				res.status(400).end();
				return false;
			}
		}

		const bookid = parseInt(req.query.bookid as string);
		const storeid = req.query.storeid ? parseInt(req.query.storeid as string) : null;

		const book = storeid ? await service.fetch(bookid, storeid) : await service.fetch(bookid);

		if(book)
			res.send(JSON.stringify(book));
		else res.status(404).end();
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

	public static async update(req:express.Request, res:express.Response) {
		const [bookid, storeid, quantity] = [
			parseInt(req.body.bookid),
			parseInt(req.body.storeid),
			parseInt(req.body.quantity),
		];

		try {
			g([
				[typeof bookid === "number", "No bookid provided to `update` route."],
				[typeof storeid === "number", "No storeid provided to `update` route."],
				[typeof quantity === "number", "No quantity provided to `update` route."],
			]);
		} catch (e) {
			if(e instanceof GuardError) {
				res.status(400).end();
				return false;
			}
		}

		const success = await service.update(bookid, storeid, quantity);

		res.status(success ? 200 : 500).end();
	}

	public static async delete(req:express.Request, res:express.Response) {
		const bookid = parseInt(req.body.bookid)

		try {
			g([
				[typeof bookid === "number", "No bookid provided to `delete` route."],
			]);
		} catch (e) {
			if(e instanceof GuardError) {
				res.status(400).end();
				return false;
			}
		}
		
		const success = await service.del(bookid);
		res.status(success ? 200 : 404).end();
	}
}