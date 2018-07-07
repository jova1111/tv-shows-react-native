import axios from 'axios';
import { getApiEndpoint } from '../constants/index';
import asyncStorage from './async-storage-service';

export default {
    login(user) {
        var data = {
            email: user.email,
            password: user.password
        }
        return new Promise((resolve, reject)=> {
            axios.post(getApiEndpoint() + '/user/login', data)
                .then(({ data }) => {
                    console.log(data)
                    this.authenticate(data.token, data.expires_in);
                    resolve("Успешно сте се улоговали!");
                })
                .catch(response => {
                    console.log(response);
                    reject(response)
                });
            
        });
    },

    authenticate(tokenStr, expDate) {
        let token = { value: tokenStr, expirationDate: Date.now() + expDate * 1000 }
        asyncStorage.setItem('token', JSON.stringify(token));
    },

    isAuthenticated() {
        return new Promise((resolve, reject) => {
            asyncStorage.getItem('token').then(tokenJson => {
                if (!tokenJson) {
                    reject("Not authenticated.");
                }
                let token = JSON.parse(tokenJson);
                if(Date.now() > token.expirationDate) {
                    asyncStorage.removeItem('token');
                    reject("Expired token.");
                }
                resolve("Authenticated.");
            }).catch(error => {
                console.log(error)
                reject(error);
            });
        });
    },

    register(user) {
        return new Promise((resolve, reject) => {
            axios.post(getApiEndpoint() + '/user', user).then(
                (success) => {
                    resolve('Успешно сте се регистровали.');
                },
                ( response ) => {
                    console.log(response)
                    console.log(response.responseText); 
                    reject(response.data);
                })
        });
    }

}