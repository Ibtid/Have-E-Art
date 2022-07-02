import React, { useContext, useEffect, useState } from 'react';
import searchgray from '../../../assets/icons/searchGray.svg';
import SingleMessageOverview from '../SingleMessageOverview/SingleMessageOverview';
import useWindowDimensions from '../../../hooks/useWindowDimension';
import './MessagesOverview.css';
import SecondaryNav from '../../shared/SecondaryNav/SecondaryNav';
import dispatch from '../../../dispatcher/dispatch';
import actions from '../../../dispatcher/actions';
import { AppContext } from '../../../hooks/AppContext';

const MessagesOverview = () => {
  const { width, height } = useWindowDimensions();
  const [rooms, setRooms] = useState([])
  const {contextStore, setContextStore} = useContext(AppContext)
  useEffect(() => {
    (async() => {
      const response = await dispatch(actions.getRooms, {}, {}, contextStore.user.token)
      console.log(response)
      if(!response.errors){
        setRooms(response)
      }
    })()
  },[])
  return (
    <div className='messagesOverview'>
      {width <= 768 && <SecondaryNav />}
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
        {rooms.map(room => <SingleMessageOverview room = {room}/>)}
      </div>
    </div>
  );
};

export default MessagesOverview;
