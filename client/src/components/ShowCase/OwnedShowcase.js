import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import Spinkit from '../../modals/Spinkit/Spinkit';
import BoughtCard from '../cards/BoughtCard/BoughtCard';

const OwnedShowcase = () => {
  const {contextStore, setContextStore} = useContext(AppContext)
  const [showSpinner, setShowSpinner] = useState(false)
  const [earts, setEarts] = useState([])
  useEffect(() => {
    (async () =>{
      setShowSpinner(true)
      const response = await dispatch(actions.getOwnedEarts, {}, {}, contextStore.user.token)
      console.log(response)
      if(response.errors){
        return
      }
      setEarts(response)
      setShowSpinner(false)
    })()
  },[])
  const listingart = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  return (
    <div className='home__cardContainer'>
      {showSpinner && <Spinkit />}
      {earts.map((eart) => (
        <BoughtCard eart={eart}/>
      ))}
    </div>
  );
};

export default OwnedShowcase;
