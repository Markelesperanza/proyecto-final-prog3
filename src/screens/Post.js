import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import Likes from '../componentes/Likes'

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    handlePostSubmit = () => {
        const { text } = this.state;
        db.collection('posts').add({
            text: text,
            owner: auth.currentUser.email,
            createdAt: new Date(),
            likes: []
        }).then(() => {
            this.setState({ text: "" });
        }).catch(e => console.log(e));
    };

    render() {
        return (
            <View style={styles.postContainer}>
                {this.props.post ? (
                    <>
                        <Text style={styles.owner}>Usuario: {this.props.post.owner}</Text>
                        <Text style={styles.text}>{this.props.post.text}</Text>
                        <Text style={styles.date}>
                            Fecha: {this.props.post.createdAt ? this.props.post.createdAt.toDate().toLocaleString() : 'Sin fecha'}
                        </Text>
                        <Likes postId={this.props.post.id} likes={this.props.post.likes} />

                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu texto"
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                        <TouchableOpacity onPress={() => { this.handlePostSubmit() }} style={styles.submitButton}>
                            <Text style={styles.submitButtonText} >Crear post</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    owner: {
        fontWeight: 'bold',
    },
    text: {
        marginTop: 5,
    },
    date: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5,
    },
    input: {
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
    submitButton: {
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
    submitButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
    },
});

