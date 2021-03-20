const connect = require('connect');
const serveStatic = require('serve-static');

const app = connect();

app.use(serveStatic("build"))
app.listen(process.env.PORT || 8081);
