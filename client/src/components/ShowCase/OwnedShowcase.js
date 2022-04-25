import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import Spinkit from '../../modals/Spinkit/Spinkit';
import OwnedCard from '../cards/OwnedCard/OwnedCard';

const OwnedShowcase = () => {
  const { contextStore, setContextStore } = useContext(AppContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [earts, setEarts] = useState([]);
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      const response = await dispatch(
        actions.getOwnedEarts,
        {},
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        return;
      }
      setEarts(response);
      setShowSpinner(false);
    })();
  }, []);

  return (
    <div className='home__cardContainer'>
      {showSpinner && <Spinkit />}
      {earts.map((eart) => (
        <OwnedCard eart={eart} />
      ))}
    </div>
  );
};

export default OwnedShowcase;
