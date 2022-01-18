import  {Sequelize}  from 'sequelize';
import config from '../config/config';
import { User, } from './User';
import { HelloUser, } from './HelloUser';
import { Session, } from './Session';


const {DB_HOST, DB_USER, DB_DB, DB_PAS,} =process.env
const sequelize = new Sequelize(DB_DB, DB_USER, DB_PAS, {
  dialect: 'postgres',
});
sequelize.sync();
export default sequelize;
