export enum POST_TYPES{
    NORMAL = "NORMAL"
}

export interface authenticatorData {
    id: string
}

export interface userCredentials {
    email: string,
    password: string
}

export interface user extends authenticatorData, userCredentials {
    name: string
}

export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: POST_TYPES
    
}

export interface SignUpInput {
    name: string,
    email: string,
    password: string,
    role: POST_TYPES
    
}

export interface LoginInput {
    email: string,
    password: string
}

export function toUserMode(obj: any): User{
    return obj &&{
        id: obj.id,
        email: obj.email,
        name: obj.name,
        password: obj.password
    }
}