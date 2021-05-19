import express from "express";
import render from "../utils/render";
import g, { t, GuardError } from "../utils/guard";
import * as service from "../services/BookstoreService";
import { BookstoreBookStatus } from "../models/BookstoreBook";

export default class WebsiteController {
	public static home(req:express.Request, res:express.Response) {
		res.send(render("../../README", {}, true))
	}

	public static async book(req:express.Request, res:express.Response) {
		const bookid = parseInt(req.query.bookid as string);
		const storeid = req.query.storeid ? parseInt(req.query.storeid as string) : null;

		let guard:t[] = [[!!bookid, "Invalid bookid provided to `book` route."]]
		if(storeid) guard.push([!!storeid, "Invalid storeid provided to `book` route."]);

		try {
			g(guard);
		} catch (e) {
			if(e instanceof GuardError) {
				res.status(400).end();
				return false;
			}
		}

		const book = storeid ? await service.fetch(bookid, storeid) : await service.fetch(bookid);

		if(book && storeid && book.status == BookstoreBookStatus.IN_STOCK)
			res.send(render("bookinstore", book));
		else if(book && storeid && book.status == BookstoreBookStatus.OUT_OF_STOCK)
			res.send(render("booknotinstore", book));
		else if(book) 
			res.send(render("book", book));
		else if (storeid) 
			res.send(render("notfoundinstore", {bookid: bookid, storeid: storeid}));
		else 
			res.send(render("notfound", {bookid: bookid}));
	}
}