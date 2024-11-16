1. ver lo de dar like 




    componentDidMount() {
        const userEmail = auth.currentUser.email;


        db.collection('posts')
            .where('owner', '==', userEmail)
            .onSnapshot(snapshot => {
                const posts = [];

                snapshot.forEach(doc => {
                    const postData = doc.data();
                    posts.push({
                        id: doc.id,
                        owner: postData.owner,
                        content: postData.content,
                        createdAt: postData.createdAt,
                    });
                });
                this.setState({
                    postNum: posts.length,
                    posts: posts,
                });
            });
    }

    handleDeletePost = (postId) => {
        db.collection('posts').doc(postId).delete()
            .then(() => {
                const filteredPosts = this.state.posts.filter(post => post.id !== postId);
                this.setState({
                    posts: filteredPosts,
                    postNum: filteredPosts.length,
                });
            })
            .catch((error) => {
                console.error("Error al eliminar el post: ", error);
            });
    };
