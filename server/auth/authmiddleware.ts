import encrypt from "./encrypt";
import express from "express";
import { authenticate } from "../services/UserService";

export default async function(req: express.Request, res:express.Response, next:Function) {
	// Quick auth mostly courtesy of these guys : https://stackoverflow.com/a/33905671
	const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
	const strauth = Buffer.from(b64auth, "base64").toString();
	const [_, login, password] = strauth.match(/(.*?):(.*)/) || [];

	let auth = false;

	try {
		await authenticate(login, password).then(
			(res) => auth = res
		);
	} catch (err) {
		auth = false;
	}

	if (auth) {
		next();
		return;
	}

	res.set("WWW-Authenticate", "Basic realm=\"401\"")
	res.status(401).send("Authentication required.")
};