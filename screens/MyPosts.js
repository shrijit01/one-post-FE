import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import PostCard from '../components/PostCard';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';

const MyPosts = () => {
    // localstate 
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // get user post 
    const getUserPosts = async () => {
        try {
            setLoading(true);//http://192.168.29.161:3000/api/v1
            const { data } = await axios.get("/post/get-user-post")
            setLoading(false);
            setPosts(data?.userPosts);
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert(error);
        }
    };

    //intial load post
    useEffect(() => {
        getUserPosts();
    }, [])




    return (
        <View style={styles.container}>
            <ScrollView>
                {posts ? (
                    <PostCard posts={posts} myPostScreen={true} />
                ) :
                    (
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )
                }
                {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            </ScrollView>
            <FooterMenu />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        alignItems: 'cenetr',
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

export default MyPosts