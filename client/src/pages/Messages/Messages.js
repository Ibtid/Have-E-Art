import React from 'react';
import MessagesOverview from '../../components/Messages/AllMessagesOverview/MessagesOverview';
import SecondaryNav from '../../components/shared/SecondaryNav/SecondaryNav';
import './Messages.css';

const Messages = () => {
  return (
    <div className='messages'>
      <div className='messages__left'>
        <MessagesOverview />
      </div>
      <div className='messages__right'>
        <SecondaryNav />
      </div>
    </div>
  );
};

export default Messages;
