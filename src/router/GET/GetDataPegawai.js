require('dotenv').config()
const client = require('../../config/dbconfig')

//sequelize
const db = require("../../models");
const Tutorial = db.pegawai;
const Op = db.Sequelize.Op;

exports.getDataPegawai = (req, res) => {
    const { limit, page, nama_pegawai } = req.query
    const newPage = page === '0' ? page : (page - 1) * limit
    let sql = ''
    let parameter = []

    if (nama_pegawai) {
        sql = "SELECT * FROM data_pegawai WHERE nama_pegawai LIKE $1 limit $2 offset $3"
        parameter = [nama_pegawai, limit, newPage]
    } else {
        sql = 'SELECT * FROM data_pegawai limit $1 offset $2'
        parameter = [limit, newPage]
    }

    try {
        let condition = nama_pegawai ? { nama_pegawai: { [Op.iLike]: `%${nama_pegawai}%` } } : null;
        Tutorial.findAll({ where: condition, limit: limit, offset: newPage, raw: true, nest: true, })
        .then(async data => {
            const total = await Tutorial.count()
            const temp = data.map(v => {
                const map = {
                    ...v,
                    region: v.alamat_pegawai === 'Jakarta' || v.alamat_pegawai === 'Bogor' ? 'Jabodetabek' : 'Non-Jabodetabek' // ternary
                }
                return map
            })
            res.status(200).send({
                success: true,
                data: temp,
                pages: page,
                total: total
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
        // client.query(sql, parameter, (error, result) => {
        //     if (result) {
        //         client.query('SELECT count(*) FROM data_pegawai;', [], (error1, result1) => {
        //             const temp = result.rows.map(v => {
        //                 const data = {
        //                     ...v,
        //                     region: v.alamat_pegawai === 'Jakarta' || v.alamat_pegawai === 'Bogor' ? 'Jabodetabek' : 'Non-Jabodetabek' // ternary
        //                 }
        //                 return data
        //             })
        //             res.status(200).send({
        //                 success: true,
        //                 data: temp,
        //                 pages: page,
        //                 total: result1.rows[0].count
        //             })
        //         })
        //     } else {
        //         console.log({error})
        //         res.status(500).send({
        //             success: false,
        //             data: error
        //         })
        //     }
        // })
    } catch (err) {
        console.log({err})
        res.status(500).send({
            success: false,
            data: err
        })
    }
}