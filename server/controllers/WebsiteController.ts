import express from "express";

export default class WebsiteController {
	public static home(req:express.Request, res:express.Response) {
		res.send("home")
	}
}