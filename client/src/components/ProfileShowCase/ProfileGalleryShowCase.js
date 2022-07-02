import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import actions from '../../dispatcher/actions';
import dispatch from '../../dispatcher/dispatch';
import { AppContext } from '../../hooks/AppContext';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import Gallery from '../cards/Gallery/Gallery';

const ProfileGalleryShowcase = () => {
  const {id} = useParams()
  const {contextStore, setContextStore} = useContext(AppContext)
  const [galleries, setGalleries] = useState([])
  const {setShowSpinner} = useContext(SpinnerContext)
  useEffect(() => {
    if(contextStore.user){
      (async () =>{
        setShowSpinner(true)
        let response = await dispatch(actions.getUserGalleries,{userId: id},{}, contextStore.user.token)
        console.log(response)
        if(response.errors){
          setShowSpinner(false)
          return
        }
        setShowSpinner(false)
        setGalleries(response)
      })()
    }
  }, [contextStore.user])
  return (
    <div className=' gallery__rowGap'>
      {galleries.map((gallery) => (
        <Gallery gallery = {gallery}/>
      ))}
    </div>
  );
};

export default ProfileGalleryShowcase;
