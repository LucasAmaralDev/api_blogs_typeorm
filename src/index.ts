import express = require('express');
import cors = require('cors');
import { routerPost } from './routes/Post.routes';
import { routesCategoria } from './routes/Categoria.routes';
import { menuRouter } from './routes/Menu.routes';

const app = express();



app.use(cors());
app.use(express.json());
app.use(routerPost)
app.use(routesCategoria)
app.use(menuRouter)

app.get('/', (req, res) => {
  res.send('Api Blog!');
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});