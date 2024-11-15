import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native';
import { db, auth } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: '',
      rememberMe: false,
      errorMsg: "",
      registered: false,
    };
  }

  handleSubmit(email, password, userName) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        if (response) {
          db.collection('users').add({
            mail: email,
            userName: userName,
            createdAt: Date.now(),
          })
          .then(() => {
            this.props.navigation.navigate('Login');
          });

          this.setState({ registered: true, errorMsg: "" });
        }
      })
      .catch(error => {
        this.setState({ errorMsg: error.message });
      });
  }

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  }

  validateInputs = () => {
    const { email, password, userName } = this.state;
    return email.length > 0 && password.length > 5 && userName.length > 0;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Pantalla de Registro </Text>

        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Username"
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        
        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

        <View style={styles.rememberMeContainer}>
          <Text>Recordarme</Text>
          <Switch
            value={this.state.rememberMe}
            onValueChange={this.toggleRememberMe}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSubmit(this.state.email, this.state.password, this.state.userName)}
          disabled={!this.validateInputs()} 
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.error}>
          {this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}
        </Text>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Ir al Login</Text>
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
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#6a1b9a', 
    marginRight: 10,
  },
});


export default Register;
