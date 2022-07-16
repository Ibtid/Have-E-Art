import React, { useContext, useEffect, useRef, useState } from 'react';

import rightArrow from '../../../assets/icons/rightArrow.svg';

import './Chat.css';
import OneChat from './OneChat';

import { Link, useParams } from 'react-router-dom';
import dispatch from '../../../dispatcher/dispatch';
import actions from '../../../dispatcher/actions';
import { AppContext } from '../../../hooks/AppContext';
import { SpinnerContext } from '../../../hooks/SpinnerContext';
import SendingChat from './SendingChat';

const Chat = () => {
  const [miniSpinner, setMiniSpinner] = useState(false);
  const [receiver, setReceiver] = useState({});
  const [room, setRoom] = useState({});
  const { chatId } = useParams();
  const { setShowSpinner } = useContext(SpinnerContext);
  const { contextStore, setContextStore } = useContext(AppContext);
  const [input, setInput] = useState('');
  //setting the last fetched page

  //all related to getting and sending messages
  const [isMessageSending, setIsMessageSending] = useState({
    state: false,
    message: '',
  });
  const [messages, _setMessages] = useState([]);
  const [messageUpdate, setMessageUpdate] = useState(0);
  const messagesRef = useRef(messages);
  const setMessages = (data) => {
    messagesRef.current = data;
    setMessageUpdate((past) => past + 1);
  };
  useEffect(() => {
    setIsMessageSending({ state: false, message: '' });

    rearrangeMessagesForDisplay(messagesRef.current);
  }, [messageUpdate]);

  const [page, _setPage] = useState({});
  const setPage = (page, state) => {
    switch (state) {
      case 'init':
        _setPage(page);
        setMessages(page.docs);
        break;
      case 'scroll':
        messagesRef.current = [...page.docs, ...messagesRef.current];
        let vMessages = messagesRef.current;
        _setPage(page);
        console.log(vMessages);
        rearrangeMessagesForDisplay(vMessages);
        break;
    }
  };

  let chatBox = useRef(null);
  let enterLock = false;
  let paginationLock = false;

  useEffect(() => {
    chatBox.current.scrollTop = chatBox.current.scrollHeight;
  }, [messages, messageUpdate, isMessageSending]);

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (enterLock === false) {
      if (e.key === 'Enter') {
        enterLock = true;
        onClickSend();
      }
    }
  };
  const onClickSend = async () => {
    if (input) {
      let dataToSend = input;
      setIsMessageSending({ state: true, message: dataToSend });

      setInput('');

      let response = await dispatch(
        actions.sendMessage,
        { roomId: chatId },
        { text: dataToSend, receiver },
        contextStore.user.token
      );

      enterLock = false;
    }
  };

  //base class loader
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      let response = await dispatch(
        actions.getRoom,
        { id: chatId },
        {},
        contextStore.user.token
      );

      if (response.errors) {
        return;
      }
      if (!response.errors) {
        const leftParticipants = response.participants.filter(
          (participant) =>
            participant._id.toString() !== contextStore.user._id.toString()
        );
        setReceiver(leftParticipants[0]);
        setRoom(response);
      }
      response = await dispatch(
        actions.getMessagesLastPage,
        { roomId: chatId },
        {},
        contextStore.user.token
      );

      setPage(response, 'init');
      if (contextStore.socket) {
        contextStore.socket.emit('joinChatRoom', [chatId]);
        contextStore.socket.on('message', messageEventListener);
      }

      setShowSpinner(false);
      // response = await dispatch(
      //   actions.getRoomMessages,
      //   { roomId: chatId },
      //   {},
      //   contextStore.user.token
      // );

      // setMessages(response);
      response = await dispatch(
        actions.viewAllMessages,
        { roomId: chatId },
        {},
        contextStore.user.token
      );
    })();

    return () => {
      //cleanup
      if (contextStore.socket) {
        contextStore.socket.off('message');
        contextStore.socket.emit('leaveChatRoom', [chatId]);
      }
    };
  }, [chatId, contextStore.user]);

  const messageEventListener = (message) => {
    const vMessages = messagesRef.current;
    vMessages.push(message);
    setMessages(vMessages);
  };
  const fetchNextPage = async (previousScrollHeight) => {
    const response = await dispatch(
      actions.getMessagePage,
      { roomId: chatId, pageNo: page.nextPage },
      {},
      contextStore.user.token
    );

    setPage(response, 'scroll');
    paginationLock = false;
    setMiniSpinner(false);

    //For CSS
    let differenceInScrollHeightAfterPagination =
      chatBox.current.scrollHeight - previousScrollHeight;
    chatBox.current.scrollTop = differenceInScrollHeightAfterPagination;
  };
  const handleScroll = (e) => {
    if (!paginationLock && e.target.scrollTop === 0 && page.hasNextPage) {
      setMiniSpinner(true);
      paginationLock = true;
      fetchNextPage(e.target.scrollHeight);
    }
  };

  const rearrangeMessagesForDisplay = (allMessages) => {
    let oneBlock = { sender: {}, messageList: [], time: 0 };
    let newArray = [];
    allMessages.map((message) => {
      if (!oneBlock.sender._id) {
        oneBlock = {
          sender: message.sender,
          messageList: [message.text],
          time: message.time,
        };
      } else {
        console.log(
          new Date(message.time).getTime() - new Date(oneBlock.time).getTime()
        );
        if (
          oneBlock.sender._id === message.sender._id &&
          new Date(message.time).getTime() - new Date(oneBlock.time).getTime() <
            180000 &&
          oneBlock.messageList.length < 10
        ) {
          oneBlock.messageList.push(message.text);
        } else {
          newArray.push(oneBlock);
          oneBlock = {
            sender: message.sender,
            messageList: [message.text],
            time: message.time,
          };
        }
      }
    });
    newArray.push(oneBlock);
    _setMessages(newArray);
  };

  return (
    <div className='chat'>
      <div className='chat__head'>
        <div className='chat__nameAndActiveStatus'>
          <div className='chat__name'>
            {receiver.firstName !== undefined
              ? `${receiver.firstName} ${receiver?.lastName}`
              : 'Loading'}
          </div>
          <div className='chat__activeStatus'></div>
        </div>
        <Link
          to={`/user/earts/GalleryShowcase/${receiver._id}`}
          className='chat__viewProfileButton'>
          <div className='chat__viewProfileText'>View Profile</div>
          <img src={rightArrow} alt='' />
        </Link>
      </div>
      <div className='chat__scroll' ref={chatBox} onScroll={handleScroll}>
        {miniSpinner && (
          <div className='mini__spinnerContainer'>
            <div className='mini__spinner'></div>
          </div>
        )}
        {messages.map((message, index) => (
          <OneChat message={message} key={index} />
        ))}
        {isMessageSending.state && (
          <SendingChat message={isMessageSending.message} />
        )}
      </div>
      <div className='chat__footer'>
        <input
          className='chat__input'
          value={input}
          onChange={onChangeInput}
          onKeyDown={handleKeyDown}
        />
        <div className='chat__button' onClick={onClickSend}>
          Send
        </div>
      </div>
    </div>
  );
};

export default Chat;
