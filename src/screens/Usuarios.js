import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

class Usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            filteredUsuarios: [],
            searchQuery: '',
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            (docs) => {
                let usuarios = [];
                docs.forEach((doc) => {
                    usuarios.push({
                        id: doc.id,
                        email: doc.data().mail,
                        username: doc.data().userName,
                    });
                });
                this.setState({ usuarios, filteredUsuarios: usuarios });
            },
            (error) => {
                console.error("Error al obtener usuarios:", error);
            }
        );
    }

    handleInputChange = (query) => {
        this.setState({ searchQuery: query }, this.filterUsuarios);
    };

    filterUsuarios = () => {
        const { usuarios, searchQuery } = this.state;

        const filteredUsuarios = usuarios.filter((usuario) =>
            usuario.username.toLowerCase().includes(searchQuery.toLowerCase())
        );

        this.setState({ filteredUsuarios });
    };

    handleResetFilter = () => {
        this.setState({
            searchQuery: '',
            filteredUsuarios: this.state.usuarios,
        });
    };

    renderUsuario = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userText}>Email: {item.email}</Text>
            <Text style={styles.userText}>Nombre de Usuario: {item.username}</Text>
        </View>
    );

    render() {
        const { filteredUsuarios, searchQuery } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pantalla de Usuarios</Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nombre de usuario"
                    value={searchQuery}
                    onChangeText={this.handleInputChange}
                />

                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={this.handleResetFilter}
                >
                    <Text style={styles.resetButtonText}>Resetear Búsqueda</Text>
                </TouchableOpacity>

                {filteredUsuarios.length > 0 ? (
                    <FlatList
                        data={filteredUsuarios}
                        keyExtractor={(item) => item.id}
                        renderItem={this.renderUsuario}
                    />
                ) : (
                    <Text style={styles.noResultsText}>
                        El nombre de usuario no existe
                    </Text>
                )}
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
        marginBottom: 20,
        color: '#6a1b9a',
        textAlign: 'center',
    },
    searchInput: {
        width: '100%',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#d1c4e9',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        fontSize: 16,
        color: '#4a148c',
    },
    resetButton: {
        backgroundColor: '#8e24aa',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30, 
    },
    resetButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    userContainer: {
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        borderColor: '#d1c4e9',
        borderWidth: 1,
        backgroundColor: '#ffffff', 
        shadowColor: '#4a148c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    userText: {
        fontSize: 16,
        color: '#4a148c',
        marginBottom: 5,
    },
    noResultsText: {
        color: "#d32f2f",
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Usuarios;
