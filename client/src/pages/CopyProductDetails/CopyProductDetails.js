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
import checkIfOwner from '../../utility/checkIfOwner';

const CopyProductDetails = () => {
  const { setShowSpinner } = useContext(SpinnerContext);
  const { id } = useParams();
  const [editPrice, setEditPrice] = useState(false);
  const [copyEart, setCopyEart] = useState({
    owner: {},
    edition: {
      eart: {
        creator: {},
      },
    },
    flag: {},
  });
  let navigate = useNavigate();
  const ratingArray = [1, 2, 3, 4, 5];

  const { contextStore, setContextStore } = useContext(AppContext);
  const [price, setPrice] = useState(copyEart.price);
  const [privacy, setPrivacy] = useState(copyEart.flag.private);
  const [listedForSale, setListedForSale] = useState(false);
  const [openCertifiedModal, setOpenCertifiedModal] = useState(false);
  const [original, setOriginal] = useState(false);
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      let response = await dispatch(
        actions.getCopyEart,
        { id },
        {},
        contextStore.user.token
      );
      console.log(response);
      if (response.errors) {
        return;
      }
      setCopyEart(response);
      setPrice(response.price);
      setPrivacy(response.flag.private);
      setShowSpinner(false);
    })();
  }, []);
  const onClickEditIcon = () => {
    setEditPrice(!editPrice);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onClickList = async () => {
    setShowSpinner(true);
    const copyEart = await dispatch(
      actions.copyEartListForSale,
      { id },
      {},
      contextStore.user.token
    );
    console.log(copyEart);
    if (!copyEart.errors) {
      setCopyEart(copyEart);
    }
    setShowSpinner(false);
  };
  const onClickUnlist = async () => {
    setShowSpinner(true);
    const copyEart = await dispatch(
      actions.copyEartUnlistForSale,
      { id },
      {},
      contextStore.user.token
    );
    if (!copyEart.errors) {
      setCopyEart(copyEart);
    }
    setShowSpinner(false);
  };
  const onClickSubmit = async () => {
    setShowSpinner(true);
    const copyEart = await dispatch(
      actions.changeCopyEart,
      { id },
      { privacy, price },
      contextStore.user.token
    );
    if (!copyEart.errors) {
      setCopyEart(copyEart);
    }
    setEditPrice(false);
    setShowSpinner(false);
  };
  return (
    <BigImageComponent imgUrl={copyEart.edition.eart.imgUrl}>
      <div className='productDetails'>
        <div className='productDetails__firstRow'>
          <div className='productDetails__name'>
            {copyEart.edition.eart.title} - {copyEart.edition.name} Edition
          </div>
          {checkIfOwner(contextStore, copyEart.owner._id) && !editPrice && (
            <div
              className='productDetails__editButton'
              onClick={onClickEditIcon}>
              <img src={EditIcon} alt='edit' />
            </div>
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
          <div className='productDetails__date'>
            {getDate(copyEart.edition.eart.uploadDate)}
          </div>
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
          <div className='productDetails__fileType'>
            {copyEart.edition.eart.format}
          </div>
          <div className='productDetails__dimension'>
            <img src={dimension} alt='dimension' />
            <div className='productDetails__dimensionText'>1920 * 1080</div>
          </div>
        </div>
        {/*.............................................................................................*/}
        <div className='productDetails__title'>Creator:</div>
        <div className='productDetails__personDescription'>
          <Link to='/profile/1' className='productDetails__personName'>
            {copyEart.edition.eart.creator.firstName}{' '}
            {copyEart.edition.eart.creator.lastName}
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
            {copyEart.owner.firstName} {copyEart.owner.lastName}
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
        <div className='productDetails__longText'>
          {copyEart.edition.eart.description}
        </div>
        <div className='productDetails__title'>Background Story:</div>
        <div className='productDetails__longText'>
          {copyEart.edition.eart.backgroundStory}
        </div>

        {!editPrice && (
          <>
            <br />
            <div className='addOrEditProductText__inputLabel'>
              Privacy: {privacy ? 'Private' : 'Public'}
            </div>
            <br />
          </>
        )}
        {editPrice && (
          <>
            <div className='productDetails__title'>Privacy:</div>
            <br />
            <div
              className='addOrEditProductText__checkbox'
              onClick={() => {
                setPrivacy(true);
              }}>
              <div
                className={
                  privacy
                    ? 'addOrEditProductText__checkboxCircle accent__background'
                    : 'addOrEditProductText__checkboxCircle'
                }></div>
              <div className='addOrEditProductText__checkboxText'>Private</div>
            </div>
            <div
              className='addOrEditProductText__checkbox addOrEditProductText__checkboxMarginBottom'
              onClick={() => {
                setPrivacy(false);
              }}>
              <div
                className={
                  !privacy
                    ? 'addOrEditProductText__checkboxCircle accent__background'
                    : 'addOrEditProductText__checkboxCircle'
                }></div>
              <div className='addOrEditProductText__checkboxText'>Public</div>
            </div>
          </>
        )}
        <div className='productDetails__priceTag'>
          <div className='productDetails__priceText'>Price: </div>
          {!editPrice ? (
            <div className='productDetails__priceNumber'>
              $ {copyEart.price}
            </div>
          ) : (
            <input
              className='addOrEditProductText__smallInput'
              type={'number'}
              value={price}
              onChange={onChangePrice}></input>
          )}
        </div>
        {editPrice && (
          <div className='addOrEditProductText__buttonGroup'>
            <div
              className='addOrEditProductText__cancelButton'
              onClick={() => {
                setPrice(copyEart.price);
                setPrivacy(copyEart.flag.private);
                setEditPrice(false);
              }}>
              Cancel
            </div>
            <div
              className='addOrEditProductText__submitButton'
              onClick={onClickSubmit}>
              Edit E-art
            </div>
          </div>
        )}

        {checkIfOwner(contextStore, copyEart.owner._id) &&
          !copyEart.flag.forSale && (
            <div className='productDetails__buyButtons'>
              <div
                className='productDetails__bigOutlineButton'
                onClick={onClickList}>
                List For Sale
              </div>
            </div>
          )}

        {checkIfOwner(contextStore, copyEart.owner._id) &&
          copyEart.flag.forSale && (
            <div className='productDetails__absoluteSection'>
              <div className='productDetails__priceTag'>
                <div className='productDetails__priceText'>Price: </div>
                <div className='productDetails__priceNumber'>
                  $ {copyEart.price}
                </div>
                <div className='productDetails__priceTagSmallText'>
                  {copyEart.price}
                </div>
              </div>
              <div className='productDetails__buyButtons'>
                <div
                  className='productDetails__changePrice'
                  onClick={onClickUnlist}>
                  Unlist
                </div>
              </div>
            </div>
          )}
        {!checkIfOwner(contextStore, copyEart.owner._id) &&
          copyEart.flag.forSale && (
            <div className='productDetails__absoluteSection'>
              <div className='productDetails__buyButtons'>
                <Link
                  to='/checkout'
                  className='productDetails__buy'
                  onClick={(e) => {
                    e.preventDefault();
                    if (contextStore.user) {
                      setContextStore({
                        ...contextStore,
                        eart: {
                          ...copyEart.edition.eart,
                          _id: copyEart._id,
                          type: 'copytransfer',
                          title: `${copyEart.edition.eart.title} - ${copyEart.edition.name} Edition`,
                          type: 'copytransfer',
                          price: copyEart.price,
                        },
                      });
                      navigate('/checkout');
                    }
                  }}>
                  Buy
                </Link>
              </div>
            </div>
          )}
      </div>
    </BigImageComponent>
  );
};

export default CopyProductDetails;
