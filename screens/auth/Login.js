import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/Forms/Inputbox'
import SubmitButton from '../../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Login = ({ navigation }) => {
    // global state 
    const [state, setState] = useContext(AuthContext);
    // states 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // functions 
    // btn function 

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                setLoading(false);
                Alert.alert('Please Fill Details')
                return;
            }
            setLoading(false);//http://192.168.29.161:3000/api/v1
            const { data } = await axios.post('/auth/signin', { email, password })
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            setState(data);
            alert(data && data.message);
            navigation.navigate('Home');
            // setName('');
            // setEmail('');
            // setPassword('');
            // console.log("LoginData -> ", { email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }

    // temp function to see syn storage data 
    const asynceStorage = async () => {
        let data = await AsyncStorage.getItem('@auth');
        console.log('Local storage ', data);
    }
    asynceStorage();

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={{ marginHorizontal: 20 }}>
                {/* <InputBox label="Name" value={name} setValue={setName} /> */}
                <InputBox label="Email"
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox label="Password"
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    setValue={setPassword}
                />
            </View>
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton
                btnTitle="Login"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>New User ?
                &nbsp;<Text style={styles.link} onPress={() => navigation.navigate("Register")}>Signup</Text>
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e1d5c9"
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        // color: "#d3d3d3",
        marginBottom: 20,
    },
    InputBox: {
        height: 50,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: '#af9f85',
    },
    linkText: {
        textAlign: 'center'
    },
    link: {
        color: '#00f'
    }
})


export default Login