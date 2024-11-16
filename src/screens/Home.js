import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { Component } from 'react';
import Post from "./Post";
import { db } from '../firebase/config';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [], 
        };
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posts = []; 
            docs.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({ posts }); 
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => (
                        <Post 
                            post={{
                                text: item.data.text,
                                owner: item.data.owner,
                                createdAt: item.data.createdAt,
                                likes: item.data.likes,
                                id: item.id
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
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
});
