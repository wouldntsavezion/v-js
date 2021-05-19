import express from "express";
import auth from "./auth/authmiddleware";
import router from "./router";

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

export default app;