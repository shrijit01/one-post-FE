import react, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import FontAsesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

// context 
const AuthContext = createContext();

//Provider 
const AuthProvider = ({ children }) => {
    //global state
    const [state, setState] = useState({
        user: null,
        token: ''
    });


    //initial local storage data
    useEffect(() => {
        // temp function to see syn storage data 
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth');
            let loginData = JSON.parse(data);
            setState({ ...state, user: loginData?.user, token: loginData?.token })
        }
        loadLocalStorageData();
    }, []);

    let token = state && state.token;
    // default axios 
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.baseURL = "https://one-post-fs.onrender.com/api/v1";


    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };