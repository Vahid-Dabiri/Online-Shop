import React, { createContext, useState } from 'react'
import axios from 'axios';

export const login_token_context = createContext();

const LoginTokenContextProvider = ({ children }) => {
    
    const exist_token = localStorage.getItem('token')
    const [user_token, set_user_token] = useState(exist_token);

    // Check if User Login
    const [is_user_auth, set_is_user_auth] = useState(false);

    if (exist_token) {
        const user_auth_handler = async () => {
            await axios.get('https://dummyjson.com/auth/me',
                {
                    headers: { 'Authorization': exist_token, }
                })
                .then(() => {
                    set_is_user_auth(true)
                })
                .catch(() => {
                    set_is_user_auth(false)
                })
        }

        user_auth_handler();
    }
    
    return (
        <login_token_context.Provider value={{
            user_token,
            set_user_token,
            is_user_auth
        }}>
            {children}
        </login_token_context.Provider>
    )
}

export default LoginTokenContextProvider