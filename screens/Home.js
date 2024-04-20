import { View, Text, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
import React, { useContext, useState, useCallback, useEffect } from 'react'
import FooterMenu from '../components/Menus/FooterMenu';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';

const Home = () => {
    // global state 
    const [posts, getAllPosts] = useContext(PostContext);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => { }, [getAllPosts]);

    // refresh callback  controll
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllPosts();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [])

    return (
        < SafeAreaView style={styles.container} >
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } style={styles.scrollView} >
                <PostCard posts={posts} />
                {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            </ScrollView>
            <FooterMenu />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 1,
        justifyContent: 'space-between',
    },
    scrollView: {
        backgroundColor: 'transparent',
        marginHorizontal: 0,
    },
})


export default Home