const server = require('./api/server')

server.listen(4000, () => {
  console.log('Server spinning up at port 4000 :)');
});