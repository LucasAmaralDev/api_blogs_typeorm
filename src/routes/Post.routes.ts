import { Router } from "express";
import { PostController } from "../controllers/PostController";

const postController = new PostController();

const routerPost = Router();

routerPost.post("/post/create", postController.create);
routerPost.get("/post/list", postController.list);
routerPost.get("/post/search", postController.search);
routerPost.get("/post/ultimas-noticias", postController.ultimasNoticias);

export { routerPost };