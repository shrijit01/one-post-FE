import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAsesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { PostContext } from '../context/postContext';

const Post = ({ navigation }) => {
    //global state
    const [posts, setPosts] = useContext(PostContext);
    // local state 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePost = async () => {
        try {
            setLoading(true);
            if (!title) {
                alert("Please add Post title ")
            }
            if (!description) {
                alert("Please add Post description")
            }//http://192.168.29.161:3000/api/v1
            const { data } = await axios.post('/post/create-post', { title, description });
            setLoading(false);
            setPosts([...posts, data?.post]);
            alert(data?.message);
            navigation.navigate('Home');
        } catch (error) {
            alert(error.response.data.message || error.messaege);
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.heading}>Create Post</Text>
                <TextInput style={styles.inputBox}
                    placeholder='Post Title'
                    placeholderTextColor={"#0077b6"}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput style={styles.inputBox}
                    placeholder='Post description'
                    placeholderTextColor={"#0077b6"}
                    multiline={true}
                    numberOfLines={6}
                    value={description}
                    onChangeText={(text) => setDescription(text)}

                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
                    <Text style={styles.postBtnText}>  <FontAsesome5 name="plus" size={18} /> Create Post</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <FooterMenu />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'space-between',
        marginTop: 40,
    },
    heading: {
        color: "#0077b6",
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    inputBox: {
        width: 300,
        marginTop: 30,
        fontSize: 20,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: "#0077b6",
        textAlignVertical: 'top',
        backgroundColor: '#ffffff',
    },
    postBtn: {
        width: 300,
        marginTop: 30,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0077b6"
    },
    postBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
})


export default Post