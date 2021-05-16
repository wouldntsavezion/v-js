import express from "express";

export default class BookstoreController {
	public static fetch(req:express.Request, res:express.Response) {
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