import React, { useContext, useEffect, useState } from 'react';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import Gallery from '../cards/Gallery/Gallery';

const GalleryShowcase = () => {
  const { contextStore, setContextStore } = useContext(AppContext);
  const [galleries, setGalleries] = useState([]);
  const { setShowSpinner } = useContext(SpinnerContext);
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      let response = await dispatch(
        actions.getGalleries,
        {},
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        setShowSpinner(false);
        return;
      }
      setShowSpinner(false);
      setGalleries(response);
    })();
  }, []);
  return (
    <div className=' gallery__rowGap'>
      {galleries.map((gallery) => (
        <Gallery gallery={gallery} />
      ))}
      <div className='illusionNav'></div>
    </div>
  );
};

export default GalleryShowcase;
