const connect = require('connect');
const serveStatic = require('serve-static');

const app = connect();

// connect to nursery-server on port 8081
app.use(serveStatic("build"))
app.listen(process.env.PORT || 8081);
