import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';

const defaultAttributes = {
    title: '',
    traktId: -1,
    fanartId: -1,
    description: '',
    rating: 0,
    imageAdress: ''
}

export class TvShow { 
     
    constructor(jsonData, source = "trakt") {
        if(!jsonData) {
            assign(this, cloneDeep(defaultAttributes));
        } 
        else {
            if(source == "server") {
                this.createFromServer(jsonData);
            }
            else if(source == "cache") {
                this.createFromCache(jsonData);
            }
            else {
                this.createFromFanart(jsonData);
            }
        }
    }

    createFromServer(jsonData) {
        this.title = jsonData.title;
        this.traktId = jsonData.trakttv_id;
        this.fanartId = jsonData.fanart_id;
        this.description = jsonData.description;
        this.rating = jsonData.rating;
        this.imageAdress = jsonData.image;
    }

    createFromCache(jsonData) {
        this.title = jsonData.title;
        this.traktId = jsonData.traktId;
        this.fanartId = jsonData.fanartId;
        this.description = jsonData.description;
        this.rating = jsonData.rating;
        this.imageAdress = jsonData.imageAdress;
    }

    createFromFanart(jsonData) {
        this.title = jsonData.show.title;
        this.traktId = jsonData.show.ids.trakt;
        this.fanartId = jsonData.show.ids.tvdb;
        this.description = jsonData.show.overview;
        this.rating = jsonData.show.rating/2;
        this.imageAdress = jsonData.show.imageAdress;
    }
}