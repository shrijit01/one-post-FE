import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Inputbox = ({ label, keyboardType, autoComplete, secureTextEntry = false, value, setValue }) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput style={styles.InputBox}
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    )
}



const styles = StyleSheet.create({

    InputBox: {
        height: 50,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: '#af9f85',
    }
})

export default Inputbox