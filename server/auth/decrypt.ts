import crypto from "crypto";
import fs from 'fs';
import path from 'path';

const KEY = fs.readFileSync(path.resolve(__dirname, 'KEY'), 'hex');

// Encrypt / Decrypt courtesy of https://stackoverflow.com/a/60370205
export default function decrypt(s:string) {
	let textParts = s.split(':');
	let shift = textParts.shift() as string;
	let iv = Buffer.from(shift, 'hex');
	let encryptedText = Buffer.from(textParts.join(':'), 'hex');
	let decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(KEY), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}