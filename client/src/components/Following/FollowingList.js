import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import UserCard from '../cards/User/UserCard';

import './FollowingList.css';

const FollowingList = () => {
  const {contextStore} = useContext(AppContext);
  const {setShowSpinner} = useContext(SpinnerContext);
  const [followedUsers, setFollowedUsers] = useState([]);
  useEffect(() => {
    (async () => {
      setShowSpinner(true)
      const response = await dispatch(actions.getFollowedUsers, {}, {}, contextStore.user.token)
      console.log(response)
      if (response.errors) {
        setShowSpinner(false);
        return;
    }
    setFollowedUsers(response)
    setShowSpinner(false)
    })()
  },[])
  return (
    <div className='followingList'>
      {followedUsers.map(followedUser => (
        <UserCard user={followedUser} />
      ))}
    </div>
  );
};

export default FollowingList;
