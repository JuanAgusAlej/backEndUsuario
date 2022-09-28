const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.comentariosPath = "/api/comentarios";
    this.aboutUsesPath = "/api/aboutUses";
    this.publicacionesPath = "/api/publicaciones";
    this.authPath = "/api/auth";
    this.like = "/api/like";
    this.suscriptionPath = "/api/suscription";
    this.middleware();
    //Rutas
    this.routes();

    this.conectarDB();
  }
  async conectarDB() {
    await dbConnection();
  }
  //middleware
  middleware() {
    //cors
    this.app.use(cors());

    //directorio publico
    this.app.use(express.static("public"));

    //lectura y parseo del body
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios.js"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.suscriptionPath, require("../routes/suscription"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
