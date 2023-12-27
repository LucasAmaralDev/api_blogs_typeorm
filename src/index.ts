import express = require('express');
import cors = require('cors');
import { PostController } from './controllers/PostController';

const app = express();

const postController = new PostController();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api Blog!');
});

app.post("/post/create", postController.create);

app.get("/post/list", postController.list);

app.get("/post/search", postController.search);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});