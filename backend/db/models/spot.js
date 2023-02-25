'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      ),
      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      ),
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      ),
      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      )
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 49]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
