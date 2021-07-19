import dbi from '../database/dbi.mjs';
import Sequelize from 'sequelize';

class Ride extends Sequelize.Model {}
Ride.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
  },
  { sequelize: dbi, modelName: 'ride', tableName: 'rides' },
);

export default Ride;
