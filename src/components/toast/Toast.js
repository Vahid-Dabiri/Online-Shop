import React, {useContext} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { shoppingCardContext } from '../../contexts/shoppingCardContext';
import './Toast.css'

export default function Toast() {
    const contextData = useContext(shoppingCardContext);

    const close_toast_handler = () => {
        contextData.set_show_card_toast(false);
    }
  return (
    <div className={`card_toast_container ${contextData.show_card_toast ? 'active_card_toast' : ''}`}>
        <span className='card_toast_text'>The product has been added to the cart</span>
        <span className='card_toast_btn' onClick={close_toast_handler}><CloseIcon /></span>
    </div>
  )
}
