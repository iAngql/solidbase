
const express = require("express");
const app = express()

const log = (logContent) => {
    const time = new Date();
    console.log(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] ${logContent}`);
};

module.exports = {log};