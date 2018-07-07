import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './containers/HomeScreen';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import axios from 'axios';
import cachingService from './services/caching-service';
import './reactotron-config';

axios.interceptors.request.use(async (request) => {
  // Only cache GET requests
  if (request.method === 'get') {
      let url = request.url;

      const cached = await cachingService.get(url);

      if (cached) {
          cached.__fromCache = true;

          console.log(`"${url}" served from cache:`);

          request.data = cached;

          // Set the request adapter to send the cached response and prevent the request from actually running
          request.adapter = () => {
              return Promise.resolve({
                  data: cached,
                  status: request.status,
                  statusText: request.statusText,
                  headers: request.headers,
                  config: request,
                  request: request
              });
          };
      }
  }

  return request;

}, error => Promise.reject(error));

// On response, set or delete the cache
axios.interceptors.response.use(async (response) => {

  // if you dont want to cache a specific url, send a param `__cache = false`
  const isCacheable = !response.config.params || (response.config.params && response.config.params.__cache !== false);

  if (isCacheable) {
      let url = response.config.url;

      if (response.config.params)
          url += '?' + $.param(response.config.params);

      if (response.config.method === 'get') {
          // On get request, store the response in the cache
          if(!await cachingService.contains(url)) {
            cachingService.add(url, response.data);
          }
      } else {
          // For post, put or delete, just delete the cached version of the url
          // e.g. posting to `/users` would delete the `/users` cache, so when you ask for users again you get the real version
          cachingService.remove(response.config.url);

          // also, when making a post,put or delete request to `/users/1`, would try to delete the `/users` for the same reason
          const uri = url.replace(config.http.api.base_url, ''),
              parentUri = /(.*)\/([a-z0-9\-]+)\/?$/ig.exec(uri);

          if (parentUri)
              cachingService.remove(`${config.http.api.base_url}${parentUri[1]}`);

          // Delete similar url that just have query string diferences
          // Specially useful for things like Laravel's `with` param
          // e.g. `/users?with=permissions` will get cached but the post to `/users` wont remove it from the cache
          // so I look all the cached url's and try to match it without the querystrings
          const urls = Object.keys(cache.debug());

          for (const _url of urls) {
              if (_url.match(/^[^?]+/)[0] === response.config.url)
                  cachingService.remove(_url);
          }
      }
  }

  return response;
}, error => Promise.reject(error));


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: Login,
    Register: Register
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}