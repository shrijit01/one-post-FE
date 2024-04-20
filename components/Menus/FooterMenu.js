import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import FontAsesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';

const FooterMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
                <FontAsesome5 name="home" style={styles.iconStyle} color={route.name === "Home" && "orange"} />
                <Text style={styles.footerText}>HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Post')}>
                <FontAsesome5 name="plus" style={styles.iconStyle} color={route.name === "post" && "orange"} />
                <Text style={styles.footerText}>POST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Myposts')}>
                <FontAsesome5 name="list" style={styles.iconStyle} color={route.name === "Myposts" && "orange"} />
                <Text style={styles.footerText}>My Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Account')}>
                <FontAsesome5 name="user" style={styles.iconStyle} color={route.name === "Account" && "orange"} />
                <Text style={styles.footerText}>ACCOUNT</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dadada',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        alignItems: "center",
    },
    // btn: {
    //     borderRadius: 5,
    //     padding: 5,
    //     backgroundColor: '#edede9',
    // },
    iconStyle: {
        color: '#0077b6',
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 20,
    },
    footerText: {
        color: "#03045e",
        fontSize: 12,
    }
})

export default FooterMenu