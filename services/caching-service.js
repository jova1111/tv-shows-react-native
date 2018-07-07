import asyncStorage from './async-storage-service';

export default {
    add(key, value) {
        asyncStorage.setItem(key, JSON.stringify({ value, validTill: Date.now() + 24 * 60 * 60 * 1000 }))
            .catch(error => {
                console.log(error);
            })
    },

    get(key) {
        return new Promise((resolve) => {
            asyncStorage.getItem(key)
                .then(item => {
                    if(!item) {
                        resolve(null);
                    }
                    item = JSON.parse(item);
                    if(Date.now() > item.validTill) {
                        asyncStorage.removeItem(key);
                        resolve(null);
                    }
                    resolve(item.value);
                });
        });
    },

    remove(key) {
        asyncStorage.removeItem(key);
    },

    contains(key) {
        return new Promise((resolve) => {
            asyncStorage.getItem(key)
                .then(item => {
                    if(!item) {
                        resolve(false);
                    }
                    resolve(true);
                });
        });
    }
}