export default function g(test:boolean, message:string) {
	if(!test) {
		console.error(" 🔥 [guard]: " + message);
		throw message;
	}
}