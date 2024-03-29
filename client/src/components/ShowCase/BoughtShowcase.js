import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import OwnedCard from '../cards/OwnedCard/OwnedCard';

const BoughtShowcase = () => {
  const { setShowSpinner } = useContext(SpinnerContext);
  const { contextStore } = useContext(AppContext);
  const [earts, setEarts] = useState([]);
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      const response = await dispatch(
        actions.getBoughtEarts,
        {},
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        setShowSpinner(false);
        return;
      }
      setEarts(response);
      setShowSpinner(false);
    })();
  }, []);
  return (
    <div className='home__cardContainer'>
      {earts.map((eart) => (
        <OwnedCard eart={eart} />
      ))}
      <div className='illusionNav'></div>
    </div>
  );
};

export default BoughtShowcase;
