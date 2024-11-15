import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errMsj: '',
        };
    }

    handleSubmit() {
        const { email, password } = this.state;

        // Validación de campos vacíos
        if (!email || !password) {
            this.setState({ errMsj: "Por favor, completa todos los campos" });
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ errMsj: '' });
                this.props.navigation.navigate('Home'); // Redirigir a Home tras el login exitoso
            })
            .catch(error => {
                this.setState({ errMsj: error.message });
            });
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Login'); // Si el usuario ya está logueado, redirigir a Home
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login:</Text>

                <TextInput
                    style={styles.field}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit()}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <Text style={styles.error}>
                    {this.state.errMsj ? <Text style={styles.error}>{this.state.errMsj}</Text> : null}
                </Text>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#f3e5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#6a1b9a',
        textAlign: 'center',
    },
    field: {
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderColor: '#d1c4e9',
        borderWidth: 1,
        backgroundColor: '#ede7f6',
        fontSize: 16,
        color: '#4a148c',
    },
    button: {
        backgroundColor: '#8e24aa',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#4a148c',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#7e57c2',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: "#d32f2f",
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
    }
});

export default Login;
