import dbi from '../database/dbi.mjs';
import Sequelize from 'sequelize';

class Address extends Sequelize.Model {}
Address.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  { sequelize: dbi, modelName: 'address', tableName: 'addresses' },
);

export default Address;
