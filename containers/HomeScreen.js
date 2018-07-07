import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import authService from '../services/auth-service';
import tvShowService from '../services/tv-show-service';
import { Loader } from '../components/helper/Loader';
import { WelcomeUser } from '../components/auth/WelcomeUser';
import { TvShowPreview } from '../components/tv-show/TvShowPreview';
import { TvShowImage } from '../containers/TvShowImage';

export class HomeScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            isLogged: false, 
            isLoaded: false,
            trendingShows: []
        }
    }

    static navigationOptions = {
        title: 'Home',
    };

    componentDidMount() {
        authService.isAuthenticated()
            .then(answer => {
                this.setState({ isLogged: true })
                
            })
            .catch(answer => {
                this.setState({ isLogged: false })
            });

        this.getTrending();
    }

    getTrending = () => {
        tvShowService.getTrending()
            .then(trending => {
                this.setState({ trendingShows: trending, isLoaded: true });
            })
            .catch(error => {
                console.log(error)
                console.log("Error while getting trending shows.");
            });
    }

    renderTrendingShows = () => {
        return this.state.trendingShows.map(show => {
            return <TvShowImage key={ show.traktId } showId={ show.fanartId }  image={ imageUrl => (
                <TvShowPreview imageUrl={ imageUrl } show={ show } />
             )} />
            
        });
    }

    render() {
        if(!this.state.isLogged) {
            return(
                <Loader isLoaded={ this.state.isLoaded }>
                    <WelcomeUser navigation={ this.props.navigation }></WelcomeUser>
                </Loader>
            );
        } 
        else {
            return(
                <Loader isLoaded={ this.state.isLoaded }>
                    { this.renderTrendingShows() }
                </Loader>
            );
        }
    }
}
