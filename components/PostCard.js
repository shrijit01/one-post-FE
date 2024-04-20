import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import moment from 'moment';
import FontAsesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import EditModal from './EditModal';

const PostCard = ({ posts, myPostScreen }) => {
    // local state 
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [post, setPost] = useState({});
    const navigation = useNavigation();

    // handle delete prompt 
    const handleDeletePrompt = (id) => {
        Alert.alert("Attention ! ", "Are You Sure Want to delete this post ?",
            [{
                text: 'Cancel',
                onPress: () => {
                    console.log('cancel press')
                }
            },
            {
                text: 'Delete',
                onPress: () => handleDeletePost(id),
            },
            ])
    }

    const handleDeletePost = async (id) => {
        try {
            setLoading(true);//http://192.168.29.161:3000/api/v1
            const { data } = await axios.delete(`/post/delete-post/${id}`);
            setLoading(false);
            alert(data?.message);
            navigation.push('Myposts');
        } catch (error) {
            setLoading(false);
            console.log(error)
            alert(error);
        }
    }

    return (
        <View>
            {/* <Text style={styles.heading}>Total Post {posts?.length}</Text> */}
            {myPostScreen && (
                <EditModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    post={post}
                />
            )}
            {
                posts?.map((post, i) => (
                    <View style={styles.card} key={i}>
                        {myPostScreen && (
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ marginHorizontal: 20 }}>
                                    <FontAsesome5
                                        name="trash"
                                        size={15}
                                        color={"red"}
                                        onPress={() => handleDeletePrompt(post?._id)}
                                    />
                                </Text>
                                <Text>
                                    <FontAsesome5
                                        name="pen"
                                        size={15}
                                        color={"#0077b6"}
                                        onPress={() => { setPost(post), setModalVisible(true) }}
                                    />
                                </Text>
                            </View>

                        )}
                        <Text style={styles.title}>Title:{post?.title}</Text>
                        <Text>{post?.description}</Text>
                        <View style={styles.footer}>
                            {post?.postedBy.name &&
                                (
                                    <Text>
                                        <FontAsesome5 name="user" color={"#0077b6"} />
                                        {" "}
                                        {post?.postedBy.name}
                                    </Text>
                                )}
                            <Text><FontAsesome5 name="clock" color={"#0077b6"} />{" "}{moment(post?.createdAt).format('DD:MM:YYYY')}</Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: '#0077b6',
        textAlign: "center",
    },
    card: {
        width: "100%",
        borderColor: '#0077b6',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        // backgroundColor: "#caf0f8",
        padding: 5,
        borderRadius: 5,
    },
    //loader 
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

export default PostCard