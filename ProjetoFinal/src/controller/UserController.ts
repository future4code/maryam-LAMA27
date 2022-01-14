import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { LoginInput, SignUpInput } from "../model/User"

export class UserController{
    async signup(req: Request, res: Response) {
        try{
            let message = "Success"

            const input: SignUpInput = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            console.log(input)

            const userBusiness = new UserBusiness()
            const token = await userBusiness.signup(input)

            res.status(201).send({message, token})

        } catch(error: any)
        {
            res.statusCode = 400
            let message = error.message
            res.send({message})
        }
    }

   async login(req: Request, res: Response) {

        try{

           let message = "Success"

           const input: LoginInput = {
               email: req.body.email,
               password: req.body.password
           }

           const token = await new UserBusiness().login(input)

           res.status(200).send({message, token})

        } catch(error: any) {
            let message = error.message
            res.statusCode = 400

            res.send({message})
        }
    }
}