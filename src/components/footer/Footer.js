import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Link } from 'react-router-dom';

import './Footer.css'

export default function Footer() {
    return (
        <footer className='main_footer'>
            <div className='top_container'>
                <div className='address_socials'>
                    <div className='address_container'>
                        <span><LocationOnIcon /> Shiraz Hedayat St.</span>
                        <span><PhoneIcon /> +989164093431</span>
                    </div>
                    <div className='socials_container'>
                        <span><a href='https://instagram.com' target='_blank' rel='noreferrer'><InstagramIcon /></a></span>
                        <span><a href='https://instagram.com' target='_blank' rel='noreferrer'><TelegramIcon /></a></span>
                        <span><a href='https://instagram.com' target='_blank' rel='noreferrer'><TwitterIcon /></a></span>
                    </div>
                </div>
                <div className='links'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/shop'>Shop</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/rolles'>Rolles</Link></li>
                    </ul>
                </div>
                <div className='logo_form'>
                    <h2 className='logo'>LOGO.</h2>
                    <form action='' method='POST'>
                        <label htmlFor="#footer_form_input">Send your email</label>
                        <input id='footer_form_input' type='email' className='email' />
                        <button type='submit'><TelegramIcon /></button>
                    </form>
                </div>
            </div>
            <div className='copy_right'>
                <p><CopyrightIcon /> all rights reserved. 2024</p>
            </div>
        </footer>
    )
}
