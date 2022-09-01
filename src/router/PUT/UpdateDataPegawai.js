require('dotenv').config()
const client = require('../../config/dbconfig')

//sequelize
const db = require("../../models");
const Tutorial = db.pegawai;

exports.updateDataPegawai = (req, res) => {
    const { id } = req.params
    const { nama_pegawai, alamat_pegawai, gaji_pegawai } = req.body

    try {
        const body = {
            nama_pegawai: nama_pegawai,
            alamat_pegawai: alamat_pegawai,
            gaji_pegawai: gaji_pegawai,
          };
          Tutorial.update(body, {
            where: { id: id }
          })
            .then(data => {
              console.log({ data })
              res.send({
                success: true,
                data: 'Data Sukses Diubah'
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
        // client.query('UPDATE data_pegawai SET nama_pegawai = $2, alamat_pegawai = $3, gaji_pegawai = $4 WHERE id = $1', 
        // [id, nama_pegawai, alamat_pegawai, gaji_pegawai], (error, result) => {
        //     if (result) {
        //         console.log({result})
        //         res.status(200).send({
        //             success: true,
        //             data: 'Data Berhasil Diubah'
        //         })
        //     } else {
        //         console.log({error})
        //         res.status(500).send({
        //             success: false,
        //             data: 'Data Gagal Diubah'
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