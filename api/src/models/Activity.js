const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    dificulty: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
    },
    season: {
      type: DataTypes.ENUM(["Verano", "Otoño", "Invierno", "Primavera", "Todo el Año"]),
      allowNull: false,
    },
  });
};