var express = require('express');
var router = require("./apis/router");
const bodyParser = require('body-parser');

var port = process.env.PORT || 3010;

var app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");
    next();
});

app.use("/mobile", router);
app.use("/desktop", router);

var server = app.listen(port, () => {
    console.log('Express server listening on port ' + server.address().port);
});