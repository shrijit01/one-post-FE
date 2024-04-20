import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
    return (
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
            <Text style={styles.btnText}>
                {loading ? "Please Wait...." : btnTitle}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitBtn: {
        backgroundColor: "#000",
        height: 50,
        marginHorizontal: 25,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 20,
    },
    btnText: {
        fontSize: 15,
        letterSpacing: 2,
        color: '#d3d3d3',
        fontWeight: 'bold',
    }
})

export default SubmitButton