export type Band = {
    id: string,
    name: string,
    music_genre: string,
    responsible: string 
}

export interface inputBand {
    name: string,
    music_genre: string,
    responsible: string,
    token: string
}

export interface bandByIdInput{
    id: string
}

export function toBandMode(obj: any): Band {
  return  obj && {
    id: obj[0].id,
    name: obj[0].name,
    music_genre: obj[0].music_genre,
    responsible: obj[0].responsible
  }
}

export type Shows = {
  id: string
  week_day: string
  start_time: string
  end_time: string
  band_id: string
}

export interface inputShow {
  week_day: string,
  start_time: string,
  end_time: string,
  band_id: string,
  token: string
}