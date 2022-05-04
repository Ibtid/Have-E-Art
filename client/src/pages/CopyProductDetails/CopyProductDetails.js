import React, { useEffect, useState } from 'react';

import star from '../../assets/icons/star.svg';
import share from '../../assets/icons/shareIcon.svg';
import favouriteOutline from '../../assets/icons/favouritesOutline.svg';
import watchVideo from '../../assets/icons/video-svgrepo-com 1.svg';
import views from '../../assets/icons/views.svg';
import dimension from '../../assets/icons/dimension.svg';
import instagram from '../../assets/icons/instagram.svg';
import messageOutline from '../ProductDetails/lightmessage.svg';
import lightfavourite from '../ProductDetails/lightfavourite.svg';
import EditIcon from '../../assets/icons/edit.svg';

import { useContext } from 'react';
import { AppContext } from '../../hooks/AppContext';

import { Link, useNavigate, useParams } from 'react-router-dom';

import CertifiedSellForm from '../../modals/CertifiedSellForm/CertifiedSellForm';
import getDate from '../../utility/getDate';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';
import Spinkit from '../../modals/Spinkit/Spinkit';
import BigImageComponent from '../../layouts/BigImageComponent';
import { SpinnerContext } from '../../hooks/SpinnerContext';

const CopyProductDetails = () => {
  const { setShowSpinner } = useContext(SpinnerContext);
  const { id } = useParams();
  const [eart, setEart] = useState({
    owner: {},
    creator: {},
    flag: {},
  });
  let navigate = useNavigate();
  const ratingArray = [1, 2, 3, 4, 5];

  const { contextStore, setContextStore } = useContext(AppContext);

  const [listedForSale, setListedForSale] = useState(false);
  const [openCertifiedModal, setOpenCertifiedModal] = useState(false);
  const [original, setOriginal] = useState(false);
  const [editions, setEditions] = useState([]);
  const onClickSellOriginal = async () => {
    setShowSpinner(true);
    const response = await dispatch(
      actions.postForSale,
      { id },
      {},
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      setShowSpinner(false);
      return;
    }
    setEart(response);
    setShowSpinner(false);
  };
  const onClickUnlist = async () => {
    setShowSpinner(true);
    const response = await dispatch(
      actions.unlistEart,
      { id },
      {},
      contextStore.user.token
    );
    console.log(response);
    if (response.errors) {
      setShowSpinner(false);
      return;
    }
    setEart(response);
    setShowSpinner(false);
  };
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      let response = await dispatch(
        actions.getEart,
        { id },
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        return;
      }
      setEart(response);
      response = await dispatch(
        actions.getEartEditions,
        { eartId: id },
        {},
        contextStore.user.token
      );
      if (response.errors) {
        return;
      }
      setEditions(response);
      setShowSpinner(false);
    })();
  }, []);
  return (
    <BigImageComponent imgUrl={eart.imgUrl}>
      <div className='productDetails'>
        {openCertifiedModal && (
          <CertifiedSellForm
            closeForm={() => {
              setOpenCertifiedModal(false);
            }}
            setListedForSale={() => {
              setListedForSale(true);
            }}
            id={id}
          />
        )}
        <div className='productDetails__firstRow'>
          <div className='productDetails__name'>{eart.title} - Copy</div>
          {contextStore.user._id == eart.owner._id && (
            <Link
              to={`/product/edit/${id}`}
              className='productDetails__editButton'>
              <img src={EditIcon} alt='edit' />
            </Link>
          )}
        </div>
        <div className='productDetails__ratingsAndVotes'>
          <div className='productDetails__ratings'>
            {ratingArray.map((rating) => (
              <span className='productDetails__stars'>
                <img src={star} className='productDetails__star' alt='star' />
              </span>
            ))}
          </div>
          <div className='productDetails__votes'>15,646 votes</div>
        </div>
        <div className='productDetails__outlinedButtons'>
          <div className='productDetails__canShrinkButton'>
            <img
              className='productDetails__outlinedButtonImage'
              src={share}
              alt=''
            />
            <div className='productDetails__shrinkButtonText'>Share</div>
          </div>
          <div className='productDetails__canShrinkButton'>
            <img
              className='productDetails__outlinedButtonImage'
              src={favouriteOutline}
              alt=''
            />
            <div className='productDetails__shrinkButtonText'>Follow</div>
          </div>
          <div className='productDetails__outlinedButton'>
            <img
              className='productDetails__outlinedButtonImage'
              src={watchVideo}
              alt=''
            />
            <div className='productDetails__outlinedButtonText'>
              Watch Video
            </div>
          </div>
        </div>
        <div className='productDetails__dateAndViews'>
          <div className='productDetails__date'>{getDate(eart.uploadDate)}</div>
          <div className='productDetails__views'>
            <img
              src={views}
              className='productDetails__viewsicon'
              alt='views'
            />
            <div className='productDetails__viewsNumber'> 198,222</div>
          </div>
        </div>
        <div className='productDetails__fileTypeAndDimension'>
          <div className='productDetails__fileType'>{eart.format}</div>
          <div className='productDetails__dimension'>
            <img src={dimension} alt='dimension' />
            <div className='productDetails__dimensionText'>1920 * 1080</div>
          </div>
        </div>
        {/*.............................................................................................*/}
        <div className='productDetails__title'>Creator:</div>
        <div className='productDetails__personDescription'>
          <Link to='/profile/1' className='productDetails__personName'>
            {eart.creator.firstName} {eart.creator.lastName}
          </Link>
          <div className='productDetails__personSocial'>
            <img
              src={lightfavourite}
              className='productDetails__socialIcon'
              alt='dimension'
            />
            <img
              src={messageOutline}
              className='productDetails__socialIcon'
              alt='dimension'
            />
            <img
              src={instagram}
              className='productDetails__socialIcon'
              alt='dimension'
            />
          </div>
        </div>
        <div className='productDetails__title'>Owner:</div>
        <div className='productDetails__personDescription'>
          <Link to='/profile/1' className='productDetails__personName'>
            {eart.owner.firstName} {eart.owner.lastName}
          </Link>
          <div className='productDetails__personSocial'>
            <img
              src={lightfavourite}
              className='productDetails__socialIcon'
              alt='dimension'
            />
            <img
              src={messageOutline}
              className='productDetails__socialIcon'
              alt='dimension'
            />
            <img
              src={instagram}
              className='productDetails__socialIcon'
              alt='dimension'
            />
          </div>
        </div>
        {/*............................................................................................*/}
        <div className='productDetails__title'>Description:</div>
        <div className='productDetails__longText'>{eart.description}</div>
        <div className='productDetails__title'>Background Story:</div>
        <div className='productDetails__longText'>{eart.backgroundStory}</div>
        {/*............................................................................................*/}
        {!(contextStore.user._id == eart.owner._id) && eart.flag.forSale && (
          <div className='productDetails__absoluteSection'>
            <div className='productDetails__priceTag'>
              <div className='productDetails__priceText'>Price: </div>
              <div className='productDetails__priceNumber'>$ {eart.price}</div>
              {/* <div className="productDetails__priceTagSmallText">
                                $500/copy
                            </div> */}
            </div>
            {/* <div className="productDetails__piecesSold">
                            69/100 pieces sold
                        </div> */}
            <div className='productDetails__buyButtons'>
              <Link to='/checkout' className='productDetails__buy'>
                Buy Original
              </Link>
            </div>
          </div>
        )}
        {/*............................................................................................*/}
        {contextStore.user._id == eart.owner._id && !eart.flag.forSale && (
          <div className='productDetails__sellButtonGroup'>
            <div className='productDetails__buyButtons'>
              <div
                className='productDetails__buy'
                onClick={onClickSellOriginal}>
                List For Sale
              </div>
            </div>
          </div>
        )}
        {/*............................................................................................*/}
        {contextStore.user._id == eart.owner._id && eart.flag.forSale && (
          <div className='productDetails__absoluteSection'>
            <div className='productDetails__priceTag'>
              <div className='productDetails__priceText'>Price: </div>
              <div className='productDetails__priceNumber'>$ {eart.price}</div>
              <div className='productDetails__priceTagSmallText'>
                {eart.price}
              </div>
            </div>
            <div
              className='productDetails__buyButtons'
              onClick={() => {
                navigate(`/product/edit/${id}`);
              }}>
              <div className='productDetails__changePrice'>Change Price</div>
            </div>
            <div className='productDetails__buyButtons' onClick={onClickUnlist}>
              <div className='productDetails__changePrice'>Unlist</div>
            </div>
          </div>
        )}
        {contextStore.user._id == eart.owner._id && (
          <div
            className='productDetails__buy'
            onClick={() => {
              setOpenCertifiedModal(true);
              setOriginal(false);
            }}>
            Create Certified Edition
          </div>
        )}
        {editions.map((edition) => (
          <div className='edition__options'>
            <div className='productDetails__priceTag'>
              <div className='productDetails__priceText'>Edition: </div>
              <div className='productDetails__priceNumber'>{edition.name}</div>
            </div>
            <div className='edition__optionsRow'>
              <div className='edition__optionsPieces'>
                {edition.available} pieces available
              </div>
              <div className='edition__optionsPrice'>
                Price: ${edition.price}
              </div>
            </div>
            {!(contextStore.user._id == eart.owner._id) && (
              <div className='productDetails__buyButtons'>
                <Link to='/checkout' className='productDetails__buy'>
                  Buy A Copy
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </BigImageComponent>
  );
};

export default CopyProductDetails;