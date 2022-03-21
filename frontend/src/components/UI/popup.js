import {useState, useEffect} from "react";
import {PopupContainer, PopupInner} from "./popup_style";
import {AiOutlineClose} from 'react-icons/ai'
export default function Popup(props) {
  return (
    props.trigger ? (
      <PopupContainer>
        <PopupInner>
          <div className='close'>
            <AiOutlineClose onClick={()=> props.setTrigger(false)}/> 
          </div>
          {props.children} 
        </PopupInner>
      </PopupContainer>    
    )
    : ""
  )
}
