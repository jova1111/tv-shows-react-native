import React, { Component } from 'react';
import { View, Image } from 'react-native';

export class Loader extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.isLoaded) {
            return(
                <View>
                    { this.props.children }
                </View>
            );
        } else {
            return(
                <Image 
                    source={{uri: 'https://i.imgur.com/pKopwXp.gif'}}
                    style={{width: 50, height: 50}}
                />
            );
        }
    }
}