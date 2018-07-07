import axios from 'axios';
import { TvShow } from '../model/tv-show';

export default {

    traktAuthHeaders: {
        'Content-Type': 'application/json',
        'trakt-api-key': 'e09f8d867591a235b53b8c7b609eb59aa644d760a9c2895266f9cea7b689a78a',
        'trakt-api-version': '2'
    },
    fanartUserKey: '19dbabd38d7c670983255be1d98206b6',
    fanartProjectKey : '7c9094291a88ff86362fabfce3cc80c0',
                                      
  
    getTrending() {
        return new Promise((resolve, reject) => {
            axios.get('https://api.trakt.tv/shows/trending?extended=full', { headers: this.traktAuthHeaders })
                .then(({ data }) => {
                    let trendingShows = [];
                    for(let showJson of data) {
                        trendingShows.push(new TvShow(showJson))
                    }
                    resolve(trendingShows);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
  
    getTvShowImage(id) {
        return new Promise((resolve, reject) => {
            axios.get('https://webservice.fanart.tv/v3/tv/'+id+'?api_key=' + this.fanartProjectKey+'&client_key=' + this.fanartUserKey)
                .then(({ data }) => {
                    if (data.tvposter) {
                        resolve(data.tvposter[0].url);
                    }
                    reject("Poster for given tv show not found.");
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
    },
  
    getTvShow(id) {
      return new Promise((resolve, reject) => {
            axios.get('https://api.trakt.tv/search/trakt/' + id + '?type=show&extended=full', { headers: this.traktAuthHeaders })
                .then(result => {
                    let tvShow = new TvShow(result[0]);
                    resolve(tvShow);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
    }
  
  }