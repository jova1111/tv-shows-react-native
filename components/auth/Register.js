import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { styles } from './index';
import { User } from '../../model/user';
import authService from '../../services/auth-service';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = { name: "", email: "", password: ""};
    }

    static navigationOptions = {
        title: 'Register'
    };

    render() {
        return (
            <View>
                <View style={ styles.formGroup }>
                    <Text>Name:</Text>
                    <TextInput 
                        onChangeText={ name => this.setState({ name }) }
                    />
                </View>
                <View style={ styles.formGroup }>
                    <Text>Email:</Text>
                    <TextInput 
                        onChangeText={ email => this.setState({ email }) }
                    />
                </View>
                <View style={ styles.formGroup }>
                    <Text>Password:</Text>
                    <TextInput 
                        secureTextEntry = { true } 
                        onChangeText={ password => this.setState({ password }) }
                    />
                </View>
                <View style={ styles.formGroup }>
                    <Button onPress={ this.handleOnSubmit } title="Register" />
                </View>
            </View>
        );
    }

    handleOnSubmit = () => {
        let user = new User();
        user.name = this.state.name;
        user.password = this.state.password;
        user.email = this.state.email;
        authService.register(user)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}