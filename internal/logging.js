
const log = (logContent) => {
    const time = new Date();
    console.log(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] ${logContent}`);
};

module.exports = {log};