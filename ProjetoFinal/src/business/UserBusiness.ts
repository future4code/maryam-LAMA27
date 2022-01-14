import { UserDatabase } from "../data/UseDatabase"
import { LoginInput, SignUpInput, User } from "../model/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { compare } from "bcryptjs"

export class UserBusiness{
    async signup(input: SignUpInput): Promise <string> {
        try{

            if(!input.name || !input.email || !input.password || !input.role){
                throw new Error("Parametros invalidos")
            }

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generate()

            const hashManager = new HashManager()
            const cypherPassword = await hashManager.createHash(input.password)

            const user: User = {
                id,
                name: input.name,
                email: input.email,
                password: cypherPassword,
                role: input.role
                
            }

            const userDatabase = new UserDatabase()
            await userDatabase.insertUser(user)

            const tokenManager = new Authenticator()
            const token: string = tokenManager.generateToken({id})

            return token
        } catch(error: any) {
            throw new Error(error.message)
        }
    }

    async login(input: LoginInput): Promise <string> {

        try{

            if(!input.email || !input.password){
                throw new Error(" Email ou senha invalido")
            }

            const userDatabase = new UserDatabase()
            const user: User = await userDatabase.userByEmail(input.email)

           if(!user) {
               throw new Error("Credenciais invalidas")
           }

           const hashManager = new HashManager()
           const passwordIsCorrect: boolean = await hashManager.compareHash(input.password, user.password)

            if(!passwordIsCorrect) {
                throw new Error("Credenciais invalidas")
            }

            const tokenManager = new Authenticator()
            const token: string = tokenManager.generateToken({
                id: user.id
            })
            
            return token

        } catch(error: any){
            throw new Error(error.message)
        }
    }
}