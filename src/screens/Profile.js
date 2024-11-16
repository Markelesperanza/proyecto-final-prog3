import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from './Post';

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
                    this.setState({
                        userData: {
                            id: userDoc.id,
                            ...userDoc.data(),
                        },
                    });
                }
            });

        db.collection('posts')
            .where('owner', '==', userEmail)
            .onSnapshot(snapshot => {
                const posts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                this.setState({
                    postNum: posts.length,
                    posts: posts
                });
            });
    }

    handleLogout = () => {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('Login');
            })
            .catch(error => {
                console.error("Error al cerrar sesión: ", error);
            });
    }

    handleDeletePost = (postId) => {

        db.collection('posts').doc(postId).delete()
            .then(() => {
                this.setState(prevState => ({
                    posts: prevState.posts.filter(post => post.id !== postId),
                    postNum: prevState.posts.length - 1
                }));
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
                    <>
                        <Text>Nombre de usuario: {userData.userName}</Text>
                        <Text>Email: {userData.mail}</Text>
                        <Text>Cantidad de publicaciones: {postNum}</Text>
                    </>
                ) : (
                    <Text>Cargando información...</Text>
                )}

                {posts.length > 0 ? (
                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View>
                                <Post post={item} />
                                <Button
                                    title="Eliminar publicación"
                                    onPress={() => this.handleDeletePost(item.id)}
                                />
                            </View>
                        )}
                    />
                ) : (
                    <Text>No tienes publicaciones aún.</Text>
                )}

                <Button title="Cerrar sesión" onPress={this.handleLogout} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Profile;
