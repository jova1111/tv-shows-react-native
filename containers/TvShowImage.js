import React, { Component } from 'react';
import tvShowService from '../services/tv-show-service';
import { View } from 'react-native';

export class TvShowImage extends Component {
    
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { imageUrl: '' }
    }

    componentDidMount() {
        tvShowService.getTvShowImage(this.props.showId)
            .then(imageUrl => {
                this.setState({ imageUrl });
            })
            .catch(error => {
                console.log('Error while getting image url.')
                console.log(error);
            });
    }

    render() {
        return(
            <View>
                { this.props.image(this.state.imageUrl) }
            </View>
        );
    }
}