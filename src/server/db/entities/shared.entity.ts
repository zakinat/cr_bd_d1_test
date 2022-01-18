import {  CreateDateColumn } from "typeorm";

export class SharedProp {
    @CreateDateColumn({
                       default: ()=>'CURRENT_TIMESTAMP',
                       type:'datetime',
                        name:'created_at'})
    createdAt: Date

}