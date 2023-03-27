import bcrypt from 'bcrypt';

function checkPW(password) {
    bcrypt.compare(password, hash, (err, result) => {
        console.log(result);
    })
}

export default checkPW;