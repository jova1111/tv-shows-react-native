import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export class TvShowPreview extends Component {
    
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return(
            <View>                   
                <Text>{ this.props.show.title }</Text>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: this.props.imageUrl ? this.props.imageUrl : 'https://www.freeiconspng.com/uploads/no-image-icon-15.png' }}
                />
            </View>
        )
    }
}