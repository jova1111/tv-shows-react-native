import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { styles } from './index';
import { User } from '../../model/user';
import authService from '../../services/auth-service';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = { email: "", password: "" }
    }

    static navigationOptions = {
        title: 'Login'
    };


    render() {
        return (
            <View>
                <View style={ styles.formGroup }>
                    <Text>Email:</Text>
                    <TextInput 
                        onChangeText={ (email) => this.setState({ email }) }
                    />
                </View>
                <View style={ styles.formGroup }>
                    <Text>Password:</Text>
                    <TextInput 
                        secureTextEntry={ true } 
                        onChangeText={ (password) => this.setState({ password }) }
                    />
                </View>
                <View style={ styles.formGroup }>
                    <Button onPress={ this.handleOnSubmit } title="Login" />
                </View>
            </View>
        );
    }

    handleOnSubmit = () => {
        user = new User();
        user.email = this.state.email;
        user.password = this.state.password;
        authService.login(user)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}