import fs from "fs";
import path from "path";
import escaperegex from "./escaperegex";

const md = require('markdown-it')();

// Very good templating engine 10/10 no edit needed
export default (template:string, data:object = {}, markdown: boolean = false) => {
	try {
		let header = fs.readFileSync(path.resolve(__dirname, "../templates/header.html"), 'utf8');

		let output = markdown ?
			md.render(fs.readFileSync(path.resolve(__dirname, "../templates/" + template + ".md"), 'utf8')) :
			fs.readFileSync(path.resolve(__dirname, "../templates/" + template + ".html"), 'utf8');

		let footer = fs.readFileSync(path.resolve(__dirname, "../templates/footer.html"), 'utf8');

		if(data) {
			for (const [key, value] of Object.entries(data)) {
				header = header.replace(new RegExp(escaperegex("${" + key + "}"), "g"), value);
				output = output.replace(new RegExp(escaperegex("${" + key + "}"), "g"), value);
				footer = footer.replace(new RegExp(escaperegex("${" + key + "}"), "g"), value);
			}
		}
		return header + output + footer;
	} catch (e) {
		return "";
	}
}