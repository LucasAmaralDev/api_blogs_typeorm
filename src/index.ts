import express = require('express');
import cors = require('cors');
import { routerPost } from './routes/Post.routes';
import { routesCategoria } from './routes/Categoria.routes';
import { routesDocumento } from './routes/Documento.routes';
import { menuRouter } from './routes/Menu.routes';
import * as dotenv from 'dotenv';
import * as path from 'path';
import swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerPost)
app.use(routesCategoria)
app.use(routesDocumento)
app.use(menuRouter)
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(require('./swagger_output.json')));

const envPath = path.resolve(__dirname, `../envs/${process.env.NODE_ENV || 'development'}.env`);
dotenv.config({ path: envPath });

app.get('/', (req, res) => {
  res.send('Api Blog!');
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

export { app };