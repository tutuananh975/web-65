const catchErrorMiddleware = (err, req, res) => {
    const status = res.status === 200 ? 500 : res.status;
    res.status(status).json({
        status: status,
        message: err,
        data: ""
    })
}

export default catchErrorMiddleware;