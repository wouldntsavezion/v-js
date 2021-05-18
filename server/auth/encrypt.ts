import crypto from "crypto";
import fs from "fs";
import path from "path";

const KEY = fs.readFileSync(path.resolve(__dirname, "KEY"), "hex");

// Encrypt / Decrypt courtesy of https://stackoverflow.com/a/60370205
export default function encrypt(s:string) {
	let iv = crypto.randomBytes(16);
	let cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(KEY), iv);
	let encrypted = cipher.update(s);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString("hex") + ":" + encrypted.toString("hex");
}