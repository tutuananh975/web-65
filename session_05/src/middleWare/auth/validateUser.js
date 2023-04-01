const valiedateEmail = (req, res, next) => {
    const {email, password} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!emailRegex.test(email)) {
        return res.json({
            status: 'failure',
            message: 'invalid email!',
            data: ""
        })
    }  
    if (!passwordRegex.test(password)) {
        return res.json({
            status: 'failure',
            message: 'invalid password',
            data: ""
        })
    }
    next();
}

export default valiedateEmail;