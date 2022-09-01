require('dotenv').config()
const client = require('../../config/dbconfig')

//sequelize
const db = require("../../models");
const Tutorial = db.pegawai;

exports.deleteDataPegawai = (req, res) => {
    const { id } = req.params

    try {
        Tutorial.destroy({ where: { id: id } })
        .then(data => {
            console.log({ data })
            res.send({
                success: true,
                data: 'Data Berhasil Dihapus'
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
        // client.query('DELETE FROM data_pegawai WHERE id = $1', 
        // [id], (error, result) => {
        //     if (result) {
        //         console.log({result})
        //         res.status(200).send({
        //             success: true,
        //             data: 'Data Berhasil Dihapus'
        //         })
        //     } else {
        //         res.status(500).send({
        //             success: false,
        //             data: 'Data Gagal Dihapus'
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