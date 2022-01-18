import 'reflect-metadata'
import {Connection, createConnection} from 'typeorm'
import { HelloUsersEntity } from './entities'

export const initDB=async ():  Promise<Connection> => {
    const entities=[HelloUsersEntity] 
    const con= await createConnection({
        type:'sqlite',
        database: './hapi.db',
        entities,
        logging: ['error'],
        logger: 'advanced-console'
    })
    await con.synchronize(false)

    return con
}