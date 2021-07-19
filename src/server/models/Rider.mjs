import dbi from '../database/dbi.mjs';
import Sequelize from 'sequelize';

class Rider extends Sequelize.Model {}
Rider.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profile: {
      type: Sequelize.ENUM(['passenger', 'driver']),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
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
  { sequelize: dbi, modelName: 'rider', tableName: 'riders' },
);

export default Rider;
