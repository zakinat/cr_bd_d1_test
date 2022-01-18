import {
  Column, DataType, Model, Table,
} from 'sequelize-typescript';
import { getUUID, } from '../utils';


@Table
export class HelloUser extends Model {
  @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), }) id: string;

  @Column({
    type: DataType.STRING,
  })
  notebookID: string;

}
