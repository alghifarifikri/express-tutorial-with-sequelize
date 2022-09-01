module.exports = (sequelize, Sequelize) => {
    const Pegawai = sequelize.define("data_pegawai", {
      id_pegawai: {
        type: Sequelize.STRING,
        field: "id_pegawai",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_pegawai: {
        type: Sequelize.STRING,
        field: "nama_pegawai",
        allowNull: true,
      },
      alamat_pegawai: {
        type: Sequelize.STRING,
        field: "alamat_pegawai",
        allowNull: true,
      },
      gaji_pegawai: {
        type: Sequelize.STRING,
        field: "gaji_pegawai",
        allowNull: true,
      }
    },
    {
      schema: "public",
      tableName: "data_pegawai",
      timestamps: false,
    });
    return Pegawai;
  };