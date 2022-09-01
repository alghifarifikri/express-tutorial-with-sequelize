require('dotenv').config()
const bcrypt = require('bcryptjs')
const uuid = require('uuid');
const client = require('../../config/dbconfig')

exports.register = (req, res) => {
  const {username, password, email} = req.body
  const enc_pass = bcrypt.hashSync(password)
  const id_pengguna = uuid.v4()
  const sql = `SELECT * from data_pengguna WHERE email = $1`

  try {
    client.query(sql, [email], 
      (err, result)=>{  
        console.log({result})
        if(result?.rows.length === 0){
            const sql1 = `INSERT INTO data_pengguna (id_pengguna, username, email, password) VALUES ($1, $2, $3, $4)`
            try {
                client.query(sql1, [id_pengguna, username, email, enc_pass], (err2, result2)=>{
                if (result2) {
                  res.send({
                      success : true,
                      message : 'Register Berhasil, Silahkan Login'
                  })
                } else if (err2) {
                  console.log({err2})
                  res.status(500).json({
                    success: false, 
                    error: err2.toString() 
                  })
                }
              })
            } catch (error) {
              console.log({error})
              res.status(500).json({
                success: false, 
                error: error.toString() 
              })
            }
        } else {
          res.status(500).send({
            success : false,
            message : 'Username atau Email Sudah Terdaftar'
          })
        }              
    })
  } catch(error) {

  }
};