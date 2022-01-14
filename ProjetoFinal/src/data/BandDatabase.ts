import { Band, toBandMode } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase{

   async createBand(band: Band){
        try{

            await this.connection("NOME_TABELA_BANDAS ")
            .insert({
                id: band.id,
                name: band.name,
                music_genre: band.music_genre,
                responsible: band.responsible
            })
        } catch(error: any) {
            throw new Error(error.message)
        }
    }
    
    async bandById(id: string): Promise <Band>{
        try{

            const result: any = await this.connection("NOME_TABELA_BANDAS")
            .select("*")
            .where({id})

            return toBandMode(result[0])

        } catch(error: any){
            throw new Error(error.message)
        }
    }
}