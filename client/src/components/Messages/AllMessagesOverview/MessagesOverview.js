import React from 'react';
import searchgray from '../../../assets/icons/searchGray.svg';
import SingleMessageOverview from '../SingleMessageOverview/SingleMessageOverview';
import './MessagesOverview.css';

const MessagesOverview = () => {
  return (
    <div className='messagesOverview'>
      <div className='messagesOverview__head'>Messages</div>
      <div className='messagesOverview__searchBar'>
        <img
          className='messagesOverview__image'
          src={searchgray}
          alt='search'
        />
        <input className='messagesOverview_searchInput' placeholder='Search' />
      </div>
      <div className='messagesOverview__scroll'>
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
        <SingleMessageOverview />
      </div>
    </div>
  );
};

export default MessagesOverview;
