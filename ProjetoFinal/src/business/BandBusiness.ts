import { BandDatabase } from "../data/BandDatabase";
import { Band, bandByIdInput, inputBand } from "../model/Band";
import { authenticatorData } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
    async createBand(input: inputBand){
        try{
            const tokenManager = new Authenticator()
            if(!input.name || !input.music_genre || !input.responsible || !input.token){
                throw new Error("Está faltando parametros")
            }

            const tokenData: authenticatorData = tokenManager.getTokenData(input.token)
            
            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generate()


            const band: Band = {
                id,
                name: input.name,
                music_genre: input.music_genre,
                responsible: tokenData.id
            }

            await new BandDatabase().createBand(band)

        } catch(error: any){
            throw new Error(error.message)
        }
    }

    async allBandById(input: bandByIdInput){
        try{

            const band: Band = await new BandDatabase().bandById(input.id)

            if(!band) {
              
            throw new Error("Band not found")
            }

            return band

        } catch(error: any){
            throw new Error(error.message)
        }
    }
}