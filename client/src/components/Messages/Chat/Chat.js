import React, { useContext, useEffect, useRef, useState } from 'react';

import rightArrow from '../../../assets/icons/rightArrow.svg';

import './Chat.css';
import OneChat from './OneChat';

import { Link, useParams } from 'react-router-dom';
import dispatch from '../../../dispatcher/dispatch';
import actions from '../../../dispatcher/actions';
import { AppContext } from '../../../hooks/AppContext';

const Chat = () => {
  const [input, setInput] = useState("")
  const [messages, _setMessages] = useState([])
  const [messageUpdate, setMessageUpdate] = useState(0)
  const messagesRef =useRef(messages)
  const setMessages = (data) => {
    messagesRef.current = data
    setMessageUpdate(past => past + 1)
  }
  const [receiver, setReceiver] = useState({})
  const [room, setRoom] = useState({})
  const {chatId} = useParams()
  const {contextStore, setContextStore} = useContext(AppContext)
  const onChangeInput = (e) => {
    setInput(e.target.value)
    
  }
  const onClickSend = async () => {
    if(input){
      let response = await dispatch(actions.sendMessage, {roomId: chatId}, {text: input}, contextStore.user.token)
    setInput("")
    }
  }
  const messageEventListener = (message) => {
    const vMessages = messagesRef.current
    vMessages.push(message)
    setMessages(vMessages)
  }
  useEffect(() => {
    (async () => {
      let response = await dispatch(actions.getRoom, {id: chatId}, {}, contextStore.user.token)
      console.log(response)
      if (response.errors){
        return
      }
      if(!response.errors){
        const leftParticipants = response.participants.filter(participant => participant._id.toString() !== contextStore.user._id.toString())
        setReceiver(leftParticipants[0])
        setRoom(response)
      }
      response = await dispatch(actions.getRoomMessages, {roomId: chatId}, {}, contextStore.user.token)
      console.log(response)
      setMessages(response)
      if(contextStore.socket){
        contextStore.socket.emit("joinChatRoom",[chatId])
        contextStore.socket.on("message",messageEventListener)
        
      }
    })()
    return () => {
      contextStore.socket.off("message")
    }
  },[])
  useEffect(() =>{
    _setMessages(messagesRef.current)
  },[messageUpdate])
  return (
    <div className='chat'>
      
      <div className='chat__head'>
        <div className='chat__nameAndActiveStatus'>
          <div className='chat__name'>{`${receiver.firstName} ${receiver.lastName}`}</div>
          <div className='chat__activeStatus'></div>
        </div>
        <Link to={`/user/earts/GalleryShowcase/${receiver._id}`} className='chat__viewProfileButton'>
          <div className='chat__viewProfileText'>View Profile</div>
          <img src={rightArrow} alt='' />
        </Link>
      </div>
      <div className='chat__scroll'>

        {messages.map(message => <OneChat message = {message} />)}
      </div>
      <div className='chat__footer'>
        <input className='chat__input' value={input} onChange={onChangeInput}/>
        <div className='chat__button' onClick={onClickSend}>Send</div>
      </div>
    </div>
  );
};

export default Chat;
