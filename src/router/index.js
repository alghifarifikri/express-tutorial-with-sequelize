const router = require('express').Router() // import Router from express
const auth = require('../utils/middleware').auth

const getDataPegawai = require('./GET/GetDataPegawai').getDataPegawai //import function get pegawai
const insertDataPegawai = require('./POST/InsertDataPegawai').insertDataPegawai
const login = require('./POST/Login').login
const register = require('./POST/Register').register
const updateDataPegawai = require('./PUT/UpdateDataPegawai').updateDataPegawai
const logout = require('./PUT/logout').logout
const deleteDataPegawai = require('./DELETE/DeleteDataPegawai').deleteDataPegawai

router.get('/get-data-pegawai', auth, getDataPegawai) // GET method
router.post('/insert-data-pegawai', insertDataPegawai)
router.post('/login', login)
router.post('/register', register)
router.put('/update-data-pegawai/:id', updateDataPegawai)
router.put('/logout', logout)
router.delete('/delete-data-pegawai/:id', deleteDataPegawai)

module.exports = router; // export router
