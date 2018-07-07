import React, { Component } from 'react';
import { View, Button } from 'react-native';

export class WelcomeUser extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return(
            <View>                   
                <Button
                    title="Login"
                    onPress={ () => this.props.navigation.navigate('Login') }
                />
                <Button
                    title="Register"
                    onPress={ () => this.props.navigation.navigate('Register') }
                />
            </View>
        )
    }
}