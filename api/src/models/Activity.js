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
      type: DataTypes.ENUM(['1', '2', '3', '4', '5']),
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
    },
    season: {
      type: DataTypes.ENUM(["Winter", "Autumn", "Spring", "Summer"]),
      allowNull: false,
    },
  });
};