export interface userResponse<T>{
    message?:String,
    data:T    
}

export interface user{
    _id: string,
    userName: string,
    email: string,
    password: string,
    createdAt: string
}