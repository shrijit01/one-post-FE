import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../components/Forms/Inputbox'
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';

const Register = ({ navigation }) => {
    // states 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // functions 
    // btn function 

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!name || !email || !password) {
                setLoading(false);
                Alert.alert('Please Fill Details')
                return;
            }
            setLoading(false);//http://192.168.29.161:3000/api/v1
            const { data } = await axios.post('/auth/signup', { name, email, password })
            alert(data && data.message);
            navigation.navigate('Login');
            // console.log('Sign up data ->', { name, email, password });
            // setName('');
            // setEmail('');
            // setPassword('');
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Register</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox label="Name" value={name} setValue={setName} />
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
                btnTitle="Register"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>Already Registered ?
                &nbsp;<Text style={styles.link} onPress={() => navigation.navigate("Login")}>Login</Text>
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

export default Register