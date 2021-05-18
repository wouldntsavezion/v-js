import express from "express";
import auth from "./auth/authmiddleware";
import WebsiteController from "./controllers/WebsiteController";
import BookstoreController from "./controllers/BookstoreController";

type route = {
	path: string,
	handler: (req: express.Request, res: express.Response) => void,
	method: "GET" | "POST",
}

const registerRoutes = (router: express.Router, routes: route[]): void => {
	routes.forEach((route) => {
		switch (route.method) {
			case "GET":
				router.get(route.path, route.handler);
				break;
			
			case "POST":
				router.post(route.path, route.handler);
				break;
		}
	});
}

const WebsiteRoutes:route[] = [
	{ path: '/book/:book/:store?', method: "GET", handler: (req, res) => WebsiteController.book(req, res) },
	{ path: '/', method: "GET", handler: (req, res) => WebsiteController.home(req, res) },
]

const BookstoreRoutes:route[] = [
	{ path: '/fetch', method: "GET", handler: (req, res) => BookstoreController.fetch(req, res) },
	{ path: '/create', method: "POST", handler: (req, res) => BookstoreController.create(req, res) },
	{ path: '/update', method: "POST", handler: (req, res) => BookstoreController.update(req, res) },
	{ path: '/delete', method: "POST", handler: (req, res) => BookstoreController.delete(req, res) },
];

const BookstoreRouter = express.Router();
BookstoreRouter.use(auth);
registerRoutes(BookstoreRouter, BookstoreRoutes);

const Router = express.Router();
Router.use("/api/", BookstoreRouter);
registerRoutes(Router, WebsiteRoutes);

export default Router;