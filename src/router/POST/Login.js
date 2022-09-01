require('dotenv').config()
const client = require('../../config/dbconfig')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

exports.login = (req, res) => {
    const { email, password } = req.body

    try {
        client.query('SELECT * FROM data_pengguna WHERE email = $1', [email], (error, result) => {
            if (result?.rows.length > 0) {
                const id = result.rows[0].id_pengguna
                const username = result.rows[0].username

                if (bcrypt.compareSync(password, result.rows[0].password)) {
                    const token = jwt.sign({id, username, email}, process.env.APP_KEY)
                    const revoked = 0
                    const id_token = uuid.v4()
                    const body = [id_token, token, revoked]

                    client.query('INSERT into revoked_token (id_token, token, is_revoked) VALUES ($1, $2, $3)', body, (error1, result1) => {
                        if (result1) {
                            res.status(200).send({
                                success: true,
                                message: 'Login Berhasil',
                                data: token
                            })
                        } else {
                            console.log({error1})
                            res.status(500).send({
                                success: false,
                                message: error1
                            })
                        }
                    })
                } else {
                    res.status(500).send({
                        success: false,
                        message: 'Password Salah'
                    })
                }
               
            } else {
                console.log({error})
                res.status(500).send({
                    success: false,
                    message: 'Email Belum Terdaftar'
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