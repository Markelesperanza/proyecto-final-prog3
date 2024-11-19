import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from './Post';
import firebase from 'firebase';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            postNum: 0,
            posts: [],
        };
    }

    componentDidMount() {
        const userEmail = auth.currentUser.email;

        db.collection('users')
            .where('mail', '==', userEmail)
            .onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    const userDoc = snapshot.docs[0];
                    const userData = userDoc.data();

                    this.setState({
                        userData: {
                            id: userDoc.id,
                            userName: userData.userName,
                            mail: userData.mail,
                        },
                    });
                }
            });

        db.collection('posts')
            .where('owner', '==', userEmail)
            .onSnapshot((docs) => {
                let posts = [];

                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                posts.sort((a, b) => b.createdAt - a.createdAt);

                this.setState({
                    postNum: posts.length,
                    posts: posts
                });
            });
    }

    logout = () => {
        auth.signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => console.error("Error al cerrar sesión: ", error));
    }

    handleDeletePost(postId) {
        db.collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                console.log("Post eliminado con éxito");
            })
            .catch((error) => {
                console.error("Error al eliminar el post: ", error);
            });
    }

    render() {
        const { userData, postNum, posts } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Mi Perfil</Text>
                {userData ? (
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userInfo}>Nombre de usuario: {userData.userName}</Text>
                        <Text style={styles.userInfo}>Email: {userData.mail}</Text>
                        <Text style={styles.userInfo}>Cantidad de publicaciones: {postNum}</Text>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Cargando información...</Text>
                )}

                {posts.length > 0 ? (
                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.postContainer}>
                                <Post post={item} />

                                <Button title="Eliminar publicación" onPress={() => this.handleDeletePost(item.id)} color="#8e24aa" />
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noPostsText} >No tienes publicaciones aún.</Text>
                )}

                <Button title="Cerrar sesión" onPress={this.logout} color="#8e24aa" />
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
    userInfoContainer: {
        marginBottom: 30,
    },
    userInfo: {
        fontSize: 16,
        color: '#4a148c',
        marginBottom: 5,
    },
    loadingText: {
        fontSize: 16,
        color: '#4a148c',
        textAlign: 'center',
    },
    postContainer: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        borderColor: '#d1c4e9',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        shadowColor: '#4a148c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    noPostsText: {
        color: "#d32f2f",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Profile;