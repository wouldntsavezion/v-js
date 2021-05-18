import express from "express";
import auth from "./auth/authmiddleware";
import router from "./router";
import quicktime from "./utils/quicktime";

require("dotenv").config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.listen(process.env.PORT, () => {
	console.log(" ⚡ [server][" + quicktime() + "]: Server is running at http://localhost:" + process.env.PORT);
});