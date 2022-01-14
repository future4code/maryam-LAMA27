import { toUserMode, User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{

   async insertUser(user: User){

    try{
        await this.connection("NOME_TABELAS_USUÁRIOS ")
    .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
    })

    } catch(error: any){
        throw new Error(error.message)
    }
   }

   async userByEmail(email: string): Promise <User>{
    try{

        const result: any = await this.connection("NOME_TABELAS_USUÁRIOS")
        .select("*")
        .where({email})

        const user = toUserMode(result[0])

        return user

    } catch(error: any){
        throw new Error(error.message)
    }
   }
}