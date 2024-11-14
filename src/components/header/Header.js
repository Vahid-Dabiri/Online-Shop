import React, { useContext, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import Toast from '../toast/Toast';
import Card from '../card/Card';
import { shoppingCardContext } from '../../contexts/shoppingCardContext';
import { login_token_context } from './../../contexts/loginContext';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import './Header.css'

export default function Header() {

    const login_infos = useContext(login_token_context);
    // let is_login = login_infos.user_token;
    const contextData = useContext(shoppingCardContext);
    const local_card_products = JSON.parse(localStorage.getItem('bag_products_array'));
    let total_card_products = 0;

    // User Auth Check

    const token = localStorage.getItem('token');
    const [is_login, set_is_login] = useState(false);

    if (token) {
        const user_auth_handler = async () => {
            await axios.get('https://dummyjson.com/auth/me',
                {
                    headers: { 'Authorization': token, }
                })
                .then(() => {
                    set_is_login(true)
                })
                .catch(() => {
                    set_is_login(false)
                })
        }

        user_auth_handler();
    }

    if(local_card_products){
        local_card_products.map(product => {
            return total_card_products += parseInt(product.product_count);
        })
    }

    const show_card_handler = () => {
        contextData.set_show_card(true)
    }

    // Log Out
    const log_out_handler = () => {
        login_infos.set_user_token(null);
        localStorage.removeItem('token');
        set_is_login(false);
    }

    return (
        <header>
            <Card />
            <Toast />
            <nav className='main_header_navbar'>
                <ul>
                    <li className='main_header_navbar_item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='main_header_navbar_item'>
                        <Link to='/shop'>Shop</Link>
                    </li>
                    <li className='main_header_navbar_item'>
                        <Link to='/about'>About</Link>
                    </li>
                    <li className='main_header_navbar_item'>
                        <Link to='/contact'>Contact</Link>
                    </li>
                </ul>
            </nav>

            <div className='main_header_logo'>
                <Link to='/'>LOGO.</Link>
            </div>

            <div className='search_login_account_container'>
                {
                    !is_login ?
                        (
                            <button className='main_header_login_btn'><Link to='/login'>Log In</Link></button>
                        )
                        :
                        (
                            <button className='main_header_account_btn'>
                                <PersonIcon />
                                <div className='header_accounts_btn_wrapper'>
                                <Link to='/account'>Account</Link>
                                <hr />
                                <Link to='/' onClick={log_out_handler}><LogoutIcon /> Log Out</Link>
                                </div>
                            </button>
                        )
                }
                <button className='main_header_search_btn'><SearchIcon /></button>
                <div className='main_header_basket_container' onClick={show_card_handler}>
                    <span className='basket_size'>{total_card_products}</span>
                    <button className='main_header_basket_btn'><ShoppingBasketIcon /></button>
                </div>
            </div>
        </header>
    )
}
