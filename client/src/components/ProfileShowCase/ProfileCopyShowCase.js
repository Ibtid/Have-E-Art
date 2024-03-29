import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import Spinkit from '../../modals/Spinkit/Spinkit';
import CopyCard from '../cards/CopyCard/CopyCard';

const ProfileCopyShowCase = () => {
  const { id } = useParams();
  const { setShowSpinner } = useContext(SpinnerContext);
  const { contextStore, setContextStore } = useContext(AppContext);
  const [copyEarts, setCopyEarts] = useState([]);
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      const response = await dispatch(
        actions.getUserCopyEarts,
        { id },
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        setShowSpinner(false);
        return;
      }
      setCopyEarts(response);
      setShowSpinner(false);
    })();
  }, []);

  return (
    <div className='home__cardContainer'>
      {copyEarts.map((eart) => (
        <CopyCard copyEart={eart} />
      ))}
      <div className='illusionNav'></div>
    </div>
  );
};

export default ProfileCopyShowCase;
