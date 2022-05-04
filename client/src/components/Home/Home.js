import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import Spinkit from '../../modals/Spinkit/Spinkit';
import ProductShowcaseCard from '../cards/ProductShowcaseCard/ProductShowcaseCard';

import './Home.css';

const Home = () => {
  const {setShowSpinner} = useContext(SpinnerContext)
  const [earts, setEarts] = useState([])
  const {contextStore, setContextStore} = useContext(AppContext)

  useEffect(() => {
    (async () => {
      setShowSpinner(true)
      const response = await dispatch(actions.getAllEarts,{},{})
      console.log(response)
      if(response.errors){
        setShowSpinner(false)
        return
      }
      setEarts(response)
      setShowSpinner(false)
    })()
  },[])
  return (
    <div className='home__cardContainer'>
      {earts.map((eart) => (
        <ProductShowcaseCard eart={eart} />
      ))}
    </div>
  );
};

export default Home;
