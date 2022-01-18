import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {  SharedProp } from '.';

@Entity({name: 'users'})
export class HelloUsersEntity extends SharedProp{

    constructor(
        notebookID: string,
        
    ){
        super()
        this.notebookID= notebookID
        
    }

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name: 'notebookID', nullable: false})
    notebookID:string;
}

