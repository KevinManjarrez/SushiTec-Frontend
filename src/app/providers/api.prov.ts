import { EventEmitter, Injectable } from "@angular/core";
import axios from 'axios';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ApiProvider{
    url = environment.apiUrl;
    public loggedInStatus = new EventEmitter<boolean>();

    login(data:any) : Promise<any>{
        this.loggedInStatus.emit(true);
        return new Promise((resolve, reject) => {
            axios.post(this.url+'users/auth/login',data).then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    isAuthenticatedUser(): boolean{
        const token = localStorage.getItem("token");
        return token ? true : false;
    }

    logout(){
        this.loggedInStatus.emit(false);
        localStorage.removeItem("token");
    }

    register(data: any): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.post(this.url+'users/auth/signup', data).then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    getMenus(): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(this.url+'menus/menu').then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    createMenu(data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve,reject) => {
            axios.post(this.url+'menus/',data, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    updateMenu(menuId: any, data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve,reject) => {
            axios.put(this.url+'menus/'+ menuId,data, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            });
        });  
    }

    deleteMenu(menuId: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve,reject) => {
            axios.delete(this.url+'menus/'+ menuId,{
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            });
        });  
    }

    getClientes(): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(this.url+'clientes/clientes').then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    createCliente(data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve,reject) => {
            axios.post(this.url+'clientes/',data, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    updateCliente(menuId: any, data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve,reject) => {
            axios.put(this.url+'clientes/'+ menuId,data, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            });
        });  
    }

    deleteCliente(menuId: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve,reject) => {
            axios.delete(this.url+'clientes/'+ menuId,{
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            });
        });  
    }
}