import { Router } from "express";
import { PostController } from "../controllers/PostController";

const postController = new PostController();

const routerPost = Router();

routerPost.get("/post/list", postController.list);
routerPost.get("/post/search", postController.search);
routerPost.get("/post/ultimas-noticias", postController.ultimasNoticias);


// CMS
routerPost.get("/cms/post", postController.list);
routerPost.get("/cms/post/:id", postController.findById);
routerPost.post("/cms/post", postController.create);
routerPost.put("/cms/post/:id", postController.update);
routerPost.delete("/cms/post/:id", postController.delete);


export { routerPost };