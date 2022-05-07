import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import Spinkit from '../../modals/Spinkit/Spinkit';
import OwnedCard from '../cards/OwnedCard/OwnedCard';

const OwnedShowcase = () => {
  const {setShowSpinner} = useContext(SpinnerContext)
  const { contextStore, setContextStore } = useContext(AppContext);
  const [earts, setEarts] = useState([]);
  useEffect(() => {
    (async () => {
      setShowSpinner(true)
      const response = await dispatch(
        actions.getOwnedEarts,
        {},
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        setShowSpinner(false)
        return;
      }
      setEarts(response);
      setShowSpinner(false)
    })();
  }, []);

  return (
    <div className='home__cardContainer'>
      {earts.map((eart) => (
        <OwnedCard eart={eart} />
      ))}
    </div>
  );
};

export default OwnedShowcase;
