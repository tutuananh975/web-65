const getRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    req.token = refreshToken;
    next();
}

export default getRefreshToken;