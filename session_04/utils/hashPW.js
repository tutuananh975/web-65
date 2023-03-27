import bcrypt from 'bcrypt';

function hashPW(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

export default hashPW;