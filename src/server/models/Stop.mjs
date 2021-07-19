import dbi from '../database/dbi.mjs';
import Sequelize from 'sequelize';

class Stop extends Sequelize.Model {}
Stop.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.ENUM(['departure', 'stop', 'arrival']),
      allowNull: false,
    },
    time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    addressId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'addresses',
      },
    },
    rideId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'rides',
      },
    },
  },
  { sequelize: dbi, modelName: 'stop', tableName: 'stops' },
);

export default Stop;
