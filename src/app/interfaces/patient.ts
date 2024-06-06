export interface Patient {
    id:string,
    firstName:string,
    lastName:string,
    gender:{
        male:string,
        female:string,
    },
    birthDate:string,
    email:string,
    phone:string
}
