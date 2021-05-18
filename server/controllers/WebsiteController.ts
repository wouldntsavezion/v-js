import express from "express";
import render from "../utils/render";

export default class WebsiteController {
	public static home(req:express.Request, res:express.Response) {
		res.send(render("../../README", {}, true))
	}
}