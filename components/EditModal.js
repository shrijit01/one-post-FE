import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const EditModal = ({ post, modalVisible, setModalVisible }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    //handle update post
    const handleUpdatePost = async (id) => {
        try {
            setLoading(true); //http://192.168.29.161:3000/api/v1
            const { data } = await axios.put(`/post/update-post/${id}`,
                {
                    title,
                    description
                })
            setLoading(false);
            alert(data?.message)
            navigation.push("Myposts");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        setTitle(post?.title);
        setDescription(post?.description);
    }, [post])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
                        <Text style={styles.modalText}>Update Your Posts</Text>
                        <Text>Title</Text>
                        <TextInput
                            style={styles.inputBox}
                            value={title}
                            onChangeText={(text) => { setTitle(text) }}
                        />
                        <Text>Description</Text>
                        <TextInput
                            style={styles.inputBox}
                            multiline={true} numberOfLines={4}
                            value={description}
                            onChangeText={(text) => { setDescription(text) }}
                        />
                        <View style={styles.btnContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    handleUpdatePost(post && post._id),
                                        setModalVisible(!modalVisible)
                                }}>
                                <Text style={styles.textStyle}>{loading ? "please Wait" : "Update"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    btnContainer: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 100,
        margin: 10
    },
    buttonOpen: {
        backgroundColor: '#0077b6',
    },
    buttonCancel: {
        backgroundColor: '#fff',
        border: '#000',
        borderWidth: 1,
    },
    cancelBtnText: {
        color: '000'
    },
    buttonClose: {
        backgroundColor: '#0077b6',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    inputBox: {
        paddingLeft: 10,
        padding: 5,
        marginBottom: 20,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginTop: 10,
        textAlignVertical: 'top',
    },

});

export default EditModal