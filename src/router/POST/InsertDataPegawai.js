require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

//sequelize
const db = require("../../models");
const Tutorial = db.pegawai;

exports.insertDataPegawai = (req, res) => {
    const id = uuid.v4()
    const { nama_pegawai, alamat_pegawai, gaji_pegawai } = req.body

    try {
        const body = {
            id: id,
            nama_pegawai: nama_pegawai,
            alamat_pegawai: alamat_pegawai,
            gaji_pegawai: gaji_pegawai,
          };
          Tutorial.create(body)
            .then(data => {
              console.log({ data })
              res.send({
                success: true,
                data: 'Data Sukses Ditambahkan'
              });
            })
            .catch(err => {
              console.log({err})
              res.status(500).send({
                success: false,
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // client.query('INSERT into data_pegawai (id, nama_pegawai, alamat_pegawai, gaji_pegawai) VALUES ($1, $2, $3, $4)', 
        // [id, nama_pegawai, alamat_pegawai, gaji_pegawai], (error, result) => {
        //     if (result) {
        //         res.status(200).send({
        //             success: true,
        //             data: 'Data Berhasil Ditambahkan'
        //         })
        //     } else {
        //         console.log({error})
        //         res.status(500).send({
        //             success: false,
        //             data: 'Data Gagal Ditambahkan'
        //         })
        //     }
        // })
    } catch (err) {
        res.status(500).send({
            success: false,
            data: err
        })
    }
}