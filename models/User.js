import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }
);

User.sync();

export default User;