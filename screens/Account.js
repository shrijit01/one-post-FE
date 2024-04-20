import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

const Account = () => {
    //global state 
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;


    // local state 
    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState(user?.password);
    const [email, setEmail] = useState(user?.email);
    const [loading, setLoading] = useState(false);

    // handle update user data 
    const handleUpdate = async () => {
        try {
            setLoading(true);//http://192.168.29.161:3000/api/v1
            const { data } = await axios.put("/auth/update-user", {
                name, password, email
            });
            setLoading(false);
            let UD = JSON.stringify(data);
            setState({ ...state, user: UD?.updatedUser })
            alert(data && data.message);
        } catch (error) {
            alert(error.response.data.message)
            setLoading(false);
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: "https://imgs.search.brave.com/RkN2hlNmb0LWFjB35MDeWJqrHi9q_ACA3qXVh4PJDks/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzAzLzQ0LzUz/LzM2MF9GXzUwMzQ0/NTM4N19DbVNtZXB3/MmFXZlZjbFZEVGNK/SHFMNjYyZUF3d1Rh/by5qcGc" }}
                        style={{ height: 200, width: 200, borderRadius: 100 }}
                    />
                </View>
                <Text style={styles.warningText}>Currently you can update name and password</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={email}
                        editable={false}
                    />

                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Role</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={state?.user.role}
                        editable={false}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
                        <Text style={styles.updateBtnText}>{loading ? "Please Wait" : "Update Profile"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View  >
                <FooterMenu />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'space-between',
        // marginTop: 40,
    },
    warningText: {
        color: "red",
        fontSize: 13,
        textAlign: "center"
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        fontWeight: 'bold',
        width: 70,
        color: 'gray'
    },
    inputBox: {
        width: 250,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        fontSize: 17,
        paddingLeft: 10,
        borderRadius: 5
    },
    updateBtn: {
        marginTop: 5,
        // padding: 10,
        borderRadius: 10,
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0077b6',
    },
    updateBtnText: {
        color: "#fff",
        fontSize: 18,
    }
})


export default Account