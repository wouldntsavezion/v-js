process.env.NODE_ENV = "tests";

import express, { Response } from "express";
const request = require("supertest");
import * as BookstoreController from "../controllers/BookstoreController";
import * as BookstoreService from "../services/BookstoreService";
import quickdate from "../utils/quickdate";
import Book from "../models/Book";
import app from "../app";
import k from "../db/knex";
import { BookstoreBookStatus } from "../models/BookstoreBook";

const [u,p] = ["admin", "celinedion"];

console.error = jest.fn();

const goodBook = {
	isbn: "9780345803481",
	name: "Fifty Shades of Grey",
	author: "E. L. James",
	date: new Date(Date.parse("2012/1/1")),
} as Omit<Book, "id">;

const badIsbnBook  = {
	isbn: "937-0707",
	name: "Fifty Shades of Grey",
	author: "E. L. James",
	date: new Date(Date.parse("2012/1/1")),
} as Omit<Book, "id">;

describe("API - Each test is re-seeding the database, which ensures there are 3 available `books`, 31 `bookstores`, and their corresponding `bookstore_books` entries.", () => {
	beforeEach(async () => {
		try {
			await k.migrate.rollback()
			await k.migrate.latest()
			await k.seed.run()
		} catch (error) {
			throw new Error(error)
		}
	});

	afterAll(() => {
		k.destroy();
	});

	it("Should fetch a book and find it's name.", async () => {
		const book = await request(app)
			.get("/api/fetch?bookid=1")
			.auth(u,p).expect(200)

		expect(JSON.parse(book.res.text).name).toBe("The Fellowship of the Ring");
	});

	it("Should fetch a book in a store and find the store's name.", async () => {
		const book = await request(app)
			.get("/api/fetch?bookid=1&storeid=1")
			.auth(u,p).expect(200)

		expect(JSON.parse(book.res.text).storename).toBe("Amalie Library");
	});

	it("Should create a book.", async () => {
		const res = await request(app)
			.post("/api/create")
			.auth(u,p)
			.send(goodBook).expect(201);
	});

	it("Should fail to create a book with an isbn that is already in the db.", async () => {
		await request(app)
			.post("/api/create")
			.auth(u,p)
			.send(goodBook);

		await request(app)
			.post("/api/create")
			.auth(u,p)
			.send(goodBook).expect(409);
	});

	it("Should fail to create a book with a wrong isbn.", async () => {
		await request(app)
			.post("/api/create")
			.auth(u,p)
			.send(badIsbnBook)
	});

	it("Should add a book to a store.", async () => {
		await request(app)
			.post("/api/update")
			.auth(u,p)
			.send({
				bookid: 1,
				storeid: 1,
				quantity: 1
			}).expect(200)
	});

	it("Should fail to add a book that does not exist to a store.", async () => {
		await request(app)
			.post("/api/update")
			.auth(u,p)
			.send({
				bookid: 42,
				storeid: 1,
				quantity: 1
			}).expect(500)
	});

	it("Should find a book with an IN_STOCK status when updating it's quantity to 1.", async () => {
		const [bookid, storeid] = [1,1];

		await request(app)
			.post("/api/update")
			.auth(u,p)
			.send({
				bookid: bookid,
				storeid: storeid,
				quantity: 1
			})

		const book = await request(app)
			.get("/api/fetch?bookid=" + bookid + "&storeid=" + storeid)
			.auth(u,p)

		expect(JSON.parse(book.res.text).status).toBe(BookstoreBookStatus.IN_STOCK);
	});

	it("Should find a book with an OUT_OF_STOCK status when updating it's quantity to 0.", async () => {
		const [bookid, storeid] = [1,1];

		await request(app)
			.post("/api/update")
			.auth(u,p)
			.send({
				bookid: bookid,
				storeid: storeid,
				quantity: 0
			})

		const book = await request(app)
			.get("/api/fetch?bookid=" + bookid + "&storeid=" + storeid)
			.auth(u,p)

		expect(JSON.parse(book.res.text).status).toBe(BookstoreBookStatus.OUT_OF_STOCK);
	});

	it("Should successfully delete a book.", async () => {
		await request(app)
			.post("/api/delete")
			.auth(u,p)
			.send({
				bookid: 1,
			}).expect(200)
	});

	it("Should fail to find a book that has been deleted.", async () => {
		const bookid = 1;

		await request(app)
			.post("/api/delete")
			.auth(u,p)
			.send({
				bookid: bookid,
			})

		await request(app)
			.get("/api/fetch?bookid=" + bookid)
			.auth(u,p).expect(404)
	});
});