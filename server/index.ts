import express from "express";
import auth from "./auth/authmiddleware";

require("dotenv").config();

const app = express();

const pvt = express.Router();
pvt.use(auth);
pvt.get("/test", (req, res) => res.send("Private route test"));

const pub = express.Router();
pub.get("/", (req, res) => res.send("Public route home"));

app.use("/API/", pvt);
app.use("/", pub);

app.listen(process.env.PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});