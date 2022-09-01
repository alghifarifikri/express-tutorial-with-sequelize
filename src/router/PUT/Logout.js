require('dotenv').config()
const client = require('../../config/dbconfig')

exports.logout = (req, res) => {
    const token = req.headers.authorization.slice(7)

    try {
        client.query('UPDATE revoked_token SET is_revoked = 1 WHERE token = $1', 
        [token], (error, result) => {
            if (result) {
                console.log({token})
                res.status(200).send({
                    success: true,
                    data: 'Anda Berhasil Logout'
                })
            } else {
                console.log({error})
                res.status(500).send({
                    success: false,
                    data: 'Gagal Logout, Coba Lagi'
                })
            }
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            data: err
        })
    }
}