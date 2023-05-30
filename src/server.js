const http = require('http');

const app = require('./app');
const { mongoConnect } = require('./service/mongo');

const server = http.createServer(app);

const PORT = 5000;

const startServer = async function () {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listeniing on ${PORT}`);
  });
};
startServer();
