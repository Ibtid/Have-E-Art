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
      const copyEarts = await dispatch(actions.getAllCopyEarts, {},{})
      const earts = [...response, ...copyEarts.map(copyEart => {
        return {...copyEart.edition.eart, _id: copyEart._id,  title: `${copyEart.edition.eart.title} - ${copyEart.edition.name} Edition`, price: copyEart.price, type: "copy", followers: [] }
      })]
      setEarts(earts);
      setShowSpinner(false);
    })();
  }, []);
  return (
    <div className='home__cardContainer '>
      {earts.map((eart) => (
        <ProductShowcaseCard eart={eart} key={eart._id} />
      ))}
      <div className='illusionNav'></div>
    </div>
  );
};

export default Home;
