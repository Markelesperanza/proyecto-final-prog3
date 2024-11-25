import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLiked: this.props.likes.includes(auth.currentUser.email),
            likesCount: this.props.likes.length,
        };
    }



    handleLike = () => {
        const postId = this.props.postId;
        db.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        }).then(() => {
            this.setState({
                userLiked: true,
                likesCount: this.state.likesCount + 1,
            });
        }).catch(error => console.error("Error adding like: ", error));
    };

    handleUnlike = () => {
        const postId = this.props.postId;
        db.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        }).then(() => {
            this.setState({
                userLiked: false,
                likesCount: this.state.likesCount - 1,
            });
        }).catch(error => console.error("Error removing like: ", error));
    };

    render() {
        return (
            <>
                <Text style={styles.likes}>Likes: {this.state.likesCount}</Text>
                <TouchableOpacity onPress={() => this.state.userLiked ? this.handleUnlike() : this.handleLike()}>
                    <FontAwesome
                        name={this.state.userLiked ? "heart" : "heart-o"}
                        size={24}
                        color={this.state.userLiked ? "red" : "grey"}
                        style={styles.likeIcon}
                    />
                </TouchableOpacity>
            </>
        );
    }
}

const styles = StyleSheet.create({
    likes: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    likeIcon: {
        marginTop: 5,
    },
});
