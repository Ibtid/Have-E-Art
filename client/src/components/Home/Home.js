import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import ProductShowcaseCard from '../cards/ProductShowcaseCard/ProductShowcaseCard';

import './Home.css';

const Home = () => {
  const { setShowSpinner } = useContext(SpinnerContext);
  const [earts, setEarts] = useState([]);

  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      const response = await dispatch(actions.getAllEarts, {}, {});
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
    <div className='home__cardContainer '>
      {earts.map((eart) => (
        <ProductShowcaseCard eart={eart} key={eart._id} />
      ))}
    </div>
  );
};

export default Home;
