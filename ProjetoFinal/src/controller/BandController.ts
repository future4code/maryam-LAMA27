import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { Band, bandByIdInput, inputBand } from "../model/Band";

export class BandController {
    async createBand(req: Request, res: Response) {
        try{
            let message = "Success"

            const token: string = req.headers.authorization as string
            
            const input: inputBand = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible,
                token
            }

            await new BandBusiness().createBand(input)

            res.status(201).send({message})

        }catch(error: any){
            let message = error.message
            res.statusCode = 400

            res.send({message})

        }
    }
    bandById = async(req: Request, res: Response) => {
        try{
            let message = "Success"

            const input: bandByIdInput = {
                id: req.params.id
            }

            const band: Band = await new BandBusiness().allBandById(input)

            res.status(200).send({message, band})


        } catch(error: any){
            let message = error.messager
            res.statusCode = 400

            res.send({message})
        }
    }

}