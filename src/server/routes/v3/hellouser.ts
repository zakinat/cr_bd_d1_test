import { helloUser,} from '../../api/v3/helloUser';
import * as Joi from 'joi';
import { outputOkSchema, } from '../../schemes';
import {  Connection, Repository } from "typeorm";
import { HelloUsersEntity } from "../../db/entities/hellousers.entity";
import { ResponseToolkit, ServerRoute, Request } from "hapi";
import { output, } from '../../utils';

export const hellouserRoutes=(con: Connection): Array<ServerRoute>=>{
  const userRepo:Repository<HelloUsersEntity>= con.getRepository(HelloUsersEntity)
  return [
    {
      method: 'GET',
      path: '/v3/hellouser',
      handler: async (request: Request, h: ResponseToolkit, err?: Error)=>{
        const notebookID=request.server.info.id.split(':')[0]
        console.log(notebookID)
        try {
          const oldUser= await userRepo.findOne({notebookID})
            if (oldUser) return output({ hellouser: `hello! your ID is: ${oldUser.id}`, });
          const user = new HelloUsersEntity(notebookID)
          const data =await userRepo.save(user);
        return output({ hellouser: `hello! your ID is: ${data.id}`, });
        } catch (error) {
          console.log(error)
        }
        
    },
      options: {
        id: 'v3.hellouser.get',
        tags: ['api', 'v3', 'hellouser'],
        auth: false,
        response: {
          schema: outputOkSchema(
            Joi.object({
              hellouser: Joi.string().example('hello John'),
            })
          ),
        },
      },
    },
  ];
}
 