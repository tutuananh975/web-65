const handleErrorMiddleware = (err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    console.log(res.statusCode);
    console.log(err);
    res.status(status).json({
        status: 'failure',
        message: err.toString()
    })
}

export default handleErrorMiddleware;