import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Account() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [is_user_auth, set_is_user_auth] = useState(false);

    const user_auth_handler = async () => {
        await axios.get('https://dummyjson.com/auth/me',
            {
                headers: { 'Authorization': token, }
            })
            .then( () => set_is_user_auth(true))
            .catch(() => {
                navigate('/login')
                set_is_user_auth(false)
            }

            )
    }


    user_auth_handler();
    if (is_user_auth) {
        return (
            <div>Account</div>
        )
    }
}
