import quicktime from "../utils/quicktime";

export type t = [boolean, string]

export class GuardError {
	constructor(public message: string) { }
};

export default function g(tests:t[]) {
	tests.some((t) => {
		if(t[0]) return false;
		console.error(" 🔥 [guard][" + quicktime() + "]: " + t[1]);
		throw new GuardError(t[1]);
		return true;
	});
}