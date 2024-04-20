import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


// context 
const PostContext = createContext();

const PostProvider = ({ children }) => {
    // global state 
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // get all posts 
    const getAllPosts = async () => {
        setLoading(true);
        try {//http://192.168.29.161:3000/api/v1
            const { data } = await axios.get("/post/get-all-post");
            setLoading(false);
            setPosts(data?.posts);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // initial post 
    useEffect(() => {
        getAllPosts();
    }, [])


    return (
        <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
            {children}
        </PostContext.Provider>
    )
}


export { PostContext, PostProvider };