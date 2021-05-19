import app from "./app";
import quicktime from "./utils/quicktime";
require("dotenv").config();

app.listen(process.env.PORT, () => {
	console.log(" ⚡ [server][" + quicktime() + "]: Server is running at http://localhost:" + process.env.PORT);
});