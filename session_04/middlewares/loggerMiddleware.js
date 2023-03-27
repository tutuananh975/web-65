const loggerMiddleware = (req, res, next) => {
    const getMonthName = index => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[index];
    }
    const getFinishedTime = () => {
        const currentDate = new Date();
        const formatDate = '[' + currentDate.getDate() + '/' + getMonthName(currentDate.getMonth()) + 
        '/' + currentDate.getFullYear() + ':' + currentDate.getHours() 
        + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds() + ' +0000' + ']';
        const statusCode = res.statusCode;
        const contentLength = res.get('Content-Length');
        console.log(formatDate, statusCode, contentLength);
    }
    res.on('finish', getFinishedTime);
    const referer = req.headers.referer || '"-"';
    const infoCLient = req.headers['user-agent'];
    const username = req.body.username || '-';
    const password = req.body.password || '-';
    const log = `"${req.ip} ${username} ${password} ${req.method} ${req.url} 
        ${req.protocol.toUpperCase()}/${req.httpVersion} 
        ${res.statusCode} ${referer} ${infoCLient}
        `;
    console.log(log);
    console.log('------------------------------');
    next();
}

export default loggerMiddleware;