import React, { useState } from 'react';
import MessagesOverview from '../../components/Messages/AllMessagesOverview/MessagesOverview';
import Chat from '../../components/Messages/Chat/Chat';
import SecondaryNav from '../../components/shared/SecondaryNav/SecondaryNav';
import './Messages.css';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { chatId } = useParams();

  return (
    <div className='messages'>
      <div className={chatId ? 'messages__left no__display' : 'messages__left'}>
        <MessagesOverview />
      </div>
      <div
        className={chatId ? 'messages__right' : 'messages__right no__display'}>
        <SecondaryNav />
        {chatId && <Chat />}
        {!chatId && (
          <div className='messages__right__empty'>
            It's quite at the moment...
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
