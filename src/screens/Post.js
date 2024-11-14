import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            userLiked: false,
            likesCount: this.props.post.likes.length,
        };
    }

    componentDidMount(){
        if(this.props.post.likes.includes(auth.currentUser.email)){
            this.setState({
                userLiked:true

            })
        }
    }

    handleLike = () => {
        const postId = this.props.post.id;
        db.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        }).then(() => {
            this.setState({
                userLiked: true,
                likesCount: this.props.post.likes.length
            });
        }).catch(error => console.error("Error adding like: ", error));
    };

    handleUnlike = () => {
        const postId = this.props.post.id;
        db.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        }).then(() => {
            this.setState({
                userLiked: false,
                likesCount: this.props.post.likes.length
            });
        }).catch(error => console.error("Error removing like: ", error));
    };

    handlePostSubmit = () => {
        const { text } = this.state;
        db.collection('posts').add({
            text: text,
            owner: auth.currentUser.email,
            createdAt: new Date(),
            likes: []
        }).then(() => {
            console.log('Se agregó el post');
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
                        <Text style={styles.likes}>Likes: {this.state.likesCount}</Text>

                        {this.state.userLiked ? (
                            <TouchableOpacity onPress={()=>{this.handleUnlike()}}>
                                <Text>Quitar Like</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={()=>{this.handleLike()}}>
                                <Text>Dar Like</Text>
                            </TouchableOpacity>
                        )}
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu texto"
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                        <TouchableOpacity onPress={()=>{this.handlePostSubmit()}} style={styles.submitButton}>
                            <Text>Crear post</Text>
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
    likes: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 5,
    },
    submitButton: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        alignItems: 'center',
    },
});

