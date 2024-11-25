import express from "express"; // Importa o Express para criar o servidor
import multer from "multer"; // Importa o multer para lidar com uploads de arquivos
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Importa as funções controladoras dos posts (provavelmente em um arquivo postsController.js)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";

const storage = multer.diskStorage({ // Define o armazenamento para os uploads
  destination: function (req, file, cb) { // Função para definir o destino do arquivo
    cb(null, 'uploads/'); // Define a pasta "uploads" como destino dos arquivos
  },
  filename: function (req, file, cb) { // Função para definir o nome do arquivo
    cb(null, file.originalname); // Utiliza o nome original do arquivo enviado
  }
});

const upload = multer({ dest: "./uploads", storage }); // Configura o multer com o armazenamento

const routes = (app) => { // Função que define as rotas da aplicação
  app.use(express.json()); // Habilita o parser JSON para interpretar requisições com corpo JSON
  app.use(cors(corsOptions));

  // Rota GET para listar posts (provavelmente implementada em listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (provavelmente implementada em postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (provavelmente implementada em uploadImagem)
  // Utiliza o middleware "upload.single('imagem')" para tratar o upload da imagem com o campo "imagem"
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função routes para ser utilizada em outro arquivo