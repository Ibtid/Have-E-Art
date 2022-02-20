import React, { useState } from 'react';
import MessagesOverview from '../../components/Messages/AllMessagesOverview/MessagesOverview';
import Chat from '../../components/Messages/Chat/Chat';
import SecondaryNav from '../../components/shared/SecondaryNav/SecondaryNav';
import './Messages.css';

const Messages = () => {
  const [chatOpen, setChatOpen] = useState(true);
  return (
    <div className='messages'>
      <div
        onClick={() => {
          setChatOpen(true);
        }}
        className={chatOpen ? 'messages__left no__display' : 'messages__left'}>
        <MessagesOverview />
      </div>
      <div
        className={
          chatOpen ? 'messages__right' : 'messages__right no__display'
        }>
        <SecondaryNav />
        {chatOpen && <Chat />}
      </div>
    </div>
  );
};

export default Messages;
