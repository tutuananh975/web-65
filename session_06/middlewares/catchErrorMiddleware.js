const catchErrorMiddleware = (req, res) => {
    res.status(500).json({
        status: 'failure',
        message: 'Internal server error!!!',
        data: ""
    })
}

export default catchErrorMiddleware;