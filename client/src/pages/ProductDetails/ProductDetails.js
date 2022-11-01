import React, { useEffect, useState, useContext } from 'react';

import star from '../../assets/icons/star.svg';
import share from '../../assets/icons/shareIcon.svg';
import favouriteOutline from '../../assets/icons/favouritesOutline.svg';
import favouriteFilled from '../../assets/icons/favoritesFilled.svg';
import watchVideo from '../../assets/icons/video-svgrepo-com 1.svg';
import views from '../../assets/icons/views.svg';
import dimension from '../../assets/icons/dimension.svg';
import instagram from '../../assets/icons/instagram.svg';
import messageOutline from './lightmessage.svg';
import lightfavourite from './lightfavourite.svg';
import EditIcon from '../../assets/icons/edit.svg';

import { AppContext } from '../../hooks/AppContext';

import { Link, useNavigate, useParams } from 'react-router-dom';

import './ProductDetails.css';
import CertifiedSellForm from '../../modals/CertifiedSellForm/CertifiedSellForm';
import getDate from '../../utility/getDate';
import dispatch from '../../dispatcher/dispatch';
import actions from '../../dispatcher/actions';
import BigImageComponent from '../../layouts/BigImageComponent';
import { SpinnerContext } from '../../hooks/SpinnerContext';
import checkIfOwner from '../../utility/checkIfOwner';

const ProductDetails = () => {
  const { setShowSpinner } = useContext(SpinnerContext);
  const { id } = useParams();
  const [eart, setEart] = useState({
    owner: {},
    creator: {},
    flag: {},
    followers: [],
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
  const fetchEditions = async () => {
    setShowSpinner(true);
    let response = await dispatch(actions.getEart, { id }, {});
    console.log(response);
    if (response.errors) {
      return;
    }
    setEart(response);
    response = await dispatch(actions.getEartEditions, { eartId: id }, {});
    if (response.errors) {
      return;
    }
    setEditions(response);
    setShowSpinner(false);
  };
  const onClickBuyOriginal = async (e) => {
    e.preventDefault();
    if (contextStore.user) {
      setContextStore({
        ...contextStore,
        eart: { ...eart, type: 'original' },
      });
      navigate('/checkout');
    }
  };
  const onClickBuyACopy = async (e, edition) => {
    e.preventDefault();
    if (contextStore.user) {
      setContextStore({
        ...contextStore,
        eart: {
          ...eart,
          title: `${eart.title} - ${edition.name} Edition`,
          type: 'copy',
        },
        edition,
      });
      navigate('/checkout');
    }
  };
  const onClickFollow = async () => {
    setShowSpinner(true);
    const response = await dispatch(
      actions.followEart,
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
  const onClickUnfollow = async () => {
    setShowSpinner(true);
    const response = await dispatch(
      actions.unfollowEart,
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
    fetchEditions();
  }, [contextStore.user]);
  return (
    <BigImageComponent imgUrl={eart.imgUrl}>
      {eart.imgUrl && (
        <div className='productDetails fadeIn'>
          {openCertifiedModal && (
            <CertifiedSellForm
              closeForm={() => {
                setOpenCertifiedModal(false);
              }}
              setListedForSale={() => {
                setListedForSale(true);
              }}
              fetchEditions={fetchEditions}
              id={id}
            />
          )}
          <div className='productDetails__firstRow'>
            <div className='productDetails__name'>{eart.title}</div>
            {checkIfOwner(contextStore, eart.owner._id) && (
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

            {contextStore.user && !checkIfOwner(contextStore, eart.owner._id) && (
              <div className='productDetails__canShrinkButton'>
                <img
                  className='productDetails__outlinedButtonImage'
                  src={
                    eart.followers.includes(contextStore.user._id)
                      ? favouriteFilled
                      : favouriteOutline
                  }
                  alt=''
                />
                {eart.followers.includes(contextStore.user._id) ? (
                  <div
                    className='productDetails__shrinkButtonText'
                    onClick={onClickUnfollow}>
                    Following
                  </div>
                ) : (
                  <div
                    className='productDetails__shrinkButtonText'
                    onClick={onClickFollow}>
                    Follow
                  </div>
                )}
              </div>
            )}

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
              {getDate(eart.uploadDate)}
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
            <div className='productDetails__fileType'>{eart.format}</div>
            <div className='productDetails__dimension'>
              <img src={dimension} alt='dimension' />
              <div className='productDetails__dimensionText'>1920 * 1080</div>
            </div>
          </div>
          {/*.............................................................................................*/}
          <div className='productDetails__title'>Creator:</div>
          <div className='productDetails__personDescription'>
            <Link
              to={`/user/earts/GalleryShowcase/${eart.creator._id}`}
              className='productDetails__personName'>
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
            <Link
              to={`/user/earts/GalleryShowcase/${eart.owner._id}`}
              className='productDetails__personName'>
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
          <br />
          {/*............................................................................................*/}
          {!checkIfOwner(contextStore, eart.owner._id) && eart.flag.forSale && (
            <div className='productDetails__absoluteSection'>
              <div className='productDetails__priceTag'>
                <div className='productDetails__priceText'>Price: </div>
                <div className='productDetails__priceNumber'>
                  $ {eart.price}
                </div>
              </div>

              <div className='productDetails__buyButtons'>
                <Link
                  to='/checkout'
                  className='productDetails__buy'
                  onClick={onClickBuyOriginal}>
                  Buy Original
                </Link>
              </div>
            </div>
          )}

          {/* STRipeeeeeeeeeeeeeeeeeeeeeeeee */}

          {/* <div className='productDetails__absoluteSection'>
            <div className='productDetails__priceTag'>
              <div className='productDetails__priceText'>Price: </div>
              <div className='productDetails__priceNumber'>$ {eart.price}</div>
            </div>

            <div className='productDetails__buyButtons'>
              <Link
                to='/checkout'
                className='productDetails__buy'
                onClick={onClickBuyOriginal}>
                Buy Original
              </Link>
            </div>
          </div> */}
          {/*............................................................................................*/}

          {checkIfOwner(contextStore, eart.owner._id) && !eart.flag.forSale && (
            <div className='productDetails__buyButtons'>
              <div
                className='productDetails__bigOutlineButton'
                onClick={onClickSellOriginal}>
                List For Sale
              </div>
            </div>
          )}
          {/*--------------------------------------------------------------------------------------------*/}
          {checkIfOwner(contextStore, eart.owner._id) && (
            <div>
              <div
                className='productDetails__bigOutlineButton'
                onClick={() => {
                  setOpenCertifiedModal(true);
                  setOriginal(false);
                }}>
                Create Certified Edition
              </div>
              <br />
            </div>
          )}
          {/*............................................................................................*/}
          {checkIfOwner(contextStore, eart.owner._id) && eart.flag.forSale && (
            <div className='productDetails__absoluteSection'>
              <div className='productDetails__priceTag'>
                <div className='productDetails__priceText'>Price: </div>
                <div className='productDetails__priceNumber'>
                  $ {eart.price}
                </div>
                <div className='productDetails__priceTagSmallText'>
                  {eart.price}
                </div>
              </div>
              <div className='productDetails__buyButtons'>
                <div
                  className='productDetails__changePrice'
                  onClick={() => {
                    navigate(`/product/edit/${id}`);
                  }}>
                  Change Price
                </div>
                <div
                  className='productDetails__changePrice'
                  onClick={onClickUnlist}>
                  Unlist
                </div>
              </div>
            </div>
          )}

          {editions.map((edition) => (
            <div className='edition__options'>
              <div className='productDetails__priceTag'>
                <div className='productDetails__priceText'>Edition: </div>
                <div className='productDetails__priceNumber'>
                  {edition.name}
                </div>
              </div>
              <div className='edition__optionsRow'>
                <div className='edition__optionsPieces'>
                  {edition.available} pieces available
                </div>
                <div className='edition__optionsPrice'>
                  Price: ${edition.price}
                </div>
              </div>
              {!checkIfOwner(contextStore, eart.owner._id) && (
                <div className='productDetails__buyButtons'>
                  <Link
                    to='/checkout'
                    className='productDetails__buy'
                    onClick={(e) => onClickBuyACopy(e, edition)}>
                    Buy A Copy
                  </Link>
                </div>
              )}
            </div>
          ))}
          <div className='illusionNav'></div>
        </div>
      )}
    </BigImageComponent>
  );
};

export default ProductDetails;
