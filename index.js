const express = require('express');
const app = express();
const config = require('./config.json');
const server = require('./internal/server');
const bodyParser = require('body-parser');
const  fs = require('fs');
let port = process.argv.slice(2)[0];

if(!port) {
    port = config.port
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("...");
    server.logging.log(`${server.colors.FgBlue} new req at ${server.colors.FgGreen} / ${server.colors.Reset}`)
});
app.post('/', (res, req) => {
    req.sendStatus(405)
})

app.post('/create', (req, res) => {
    if(!req.body.DataName) return res.sendStatus(203);

    server.logging.log(`Got body: ${req.body}`)
    server.logging.log(`${server.colors.FgBlue} new req at ${server.colors.FgGreen} /create ${server.colors.Reset}`)
    server.logging.log(`data name: ${req.body.DataName}`);
    
    fs.writeFile(`./data/${req.body.DataName}.json`, JSON.stringify(req.body), function(err) {
        if(err) {
            server.logging.log(err)
            return res.sendStatus(500);
        }
        server.logging.log(`${server.colors.FgYellow} New data saved with name ${server.colors.FgGreen} ' ${req.body.DataName} ' ${server.colors.Reset}`);
    }); 
    
    res.sendStatus(200);
});

app.post('/delete', (req, res) => {
    if(!req.body.DataName) return res.sendStatus(203);

    server.logging.log(`${server.colors.FgBlue} new req at ${server.colors.FgGreen} /deldata ${server.colors.Reset}`)
    server.logging.log(`${server.colors.FgBlue} Data deletion on ${server.colors.FgGreen} '${req.body.DataName}' ${server.colors.Reset}`)

    fs.unlink(`./data/${req.body.DataName}.json`, (err) => {
        if(err) {
            server.logging.log(err)
            return res.sendStatus(500)
        }
        server.logging.log(`${server.colors.FgBlue} Deleted data ${server.colors.FgBlue}'${req.body.DataName}'${server.colors.Reset}`)
        return res.sendStatus(200);
    });
});

app.post('/read', (req, res) => {
    if(!req.body.DataName) return res.sendStatus(203);

    server.logging.log(`${server.colors.FgBlue} Reading data ${server.colors.FgGreen}'${req.body.DataName}'${server.colors.Reset}`)
    fs.readFile(`./data/${req.body.DataName}.json`, (err, data) => {
        if (err) {
            server.logging.log(err)
            return res.sendStatus(500);
        }
        server.logging.log(`${server.colors.FgBlue} Read data ${server.colors.FgGreen}'${req.body.DataName}'${server.colors.Reset}`)
        res.send(data)
    });
});

app.listen(port, () => {
    // console.log("server started!");
    server.logging.log(`${server.colors.FgGreen} ${config.server_name} ${server.colors.FgYellow} started and listening on port ${server.colors.FgGreen} ${port} ${server.colors.FgBlue} ( http://localhost:${port} ) ${server.colors.Reset}`);
});
