const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server started at port :${PORT}`);
  });
}
startServer();
