import bcrypt from 'bcrypt';

export const enkrip = (pass) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass, salt);
}

export const compare = (pass, hash) => {
    return bcrypt.compareSync(pass, hash)
}