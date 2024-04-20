import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import FontAsesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext);
    //logout 

    const handleLogout = async () => {
        setState({ token: '', user: null });
        await AsyncStorage.removeItem('@auth');
        alert('Logout Successfully !')
    }

    return (
        <View>
            <TouchableOpacity onPress={handleLogout}>
                <Text>
                    <FontAsesome5 name="sign-out-alt" style={styles.iconStyle} />
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    iconStyle: {
        color: '#0077b6',
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 20,
    },

})


export default HeaderMenu