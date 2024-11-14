import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import './Contact.css';

export default function Contact() {
    return (
        <main>
            <div className='contact_container'>
                <div className='contact_infos_container'>
                    <h1 className='page_title'>Contact Us</h1>
                    <div className='contact_address_form_container'>
                        <div className='contact_address_container'>
                            <div className='container_icon'><LocationOnIcon /><span>Shiraz Hedayat St.</span></div>
                            <div className='container_icon'><LocalPhoneIcon /><span>+989164093431</span></div>
                            <div className='container_icon'><EmailIcon /><span>vahiddabiriwork@gmail.com</span></div>
                            <div className='container_map'>
                                <a href='https://www.google.com/maps/@29.6227073,52.5194048,16.25z?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D' target='_blank' rel='noreferrer'><img src='./images/map.jpg' alt='map' /></a>
                            </div>
                        </div>
                        <div className='contact_form_container'>
                            <form className='contact_form'>
                                <label htmlFor='name_input'>
                                    Name
                                    <input id='name_input' type='text' />
                                </label>
                                <label htmlFor='email_input'>
                                    Email
                                    <input id='email_input' type='email' />
                                </label>
                                
                                <label htmlFor='message_input'>
                                    Message
                                    <textarea id='message_input' rows={10} cols={50} />
                                </label>
                                <button type='submit'>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
