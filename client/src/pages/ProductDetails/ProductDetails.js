import React from 'react';

import star from '../../assets/icons/star.svg';
import share from '../../assets/icons/shareIcon.svg';
import favouriteOutline from '../../assets/icons/favouritesOutline.svg';
import watchVideo from '../../assets/icons/video-svgrepo-com 1.svg';
import views from '../../assets/icons/views.svg';
import dimension from '../../assets/icons/dimension.svg';
import instagram from '../../assets/icons/instagram.svg';
import messageOutline from './lightmessage.svg';
import lightfavourite from './lightfavourite.svg';

import './ProductDetails.css';

const ProductDetails = () => {
  const ratingArray = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className='productDetails'>
        <div className='productDetails__name'>Color Brust</div>
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
          <div className='productDetails__date'>16th February, 2022</div>
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
          <div className='productDetails__fileType'>pdf</div>
          <div className='productDetails__dimension'>
            <img src={dimension} alt='dimension' />
            <div className='productDetails__dimensionText'>1920 * 1080</div>
          </div>
        </div>
        {/*.............................................................................................*/}
        <div className='productDetails__title'>Creator:</div>
        <div className='productDetails__personDescription'>
          <div className='productDetails__personName'>Don Carlo</div>
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
          <div className='productDetails__personName'>Don Carlo</div>
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
          Hard-working artisan, solitary genius, credentialed professional—the
          image of the artist has changed radically over the centuries. What if
          the latest model to emerge means the end of art as we have known it?
        </div>
        <div className='productDetails__title'>Background Story:</div>
        <div className='productDetails__longText'>
          Before we thought of artists as geniuses, we thought of them as
          artisans. The words, by no coincidence, are virtually the same. Art
          itself derives from a root that means to “join” or “fit together”.
        </div>
        {/*............................................................................................*/}
        <div className='productDetails__absoluteSection'>
          <div className='productDetails__priceTag'>
            <div className='productDetails__priceText'>Price: </div>
            <div className='productDetails__priceNumber'>$ 10,000.00</div>
            <div className='productDetails__priceTagSmallText'>$500/copy</div>
          </div>
          <div className='productDetails__piecesSold'>69/100 pieces sold</div>
          <div className='productDetails__buyButtons'>
            <div className='productDetails__buy'>Buy Original</div>
            <div className='productDetails__buy'>Buy Certified Copy</div>
          </div>
        </div>
      </div>
      {/*............................................................................................*/}
    </div>
  );
};

export default ProductDetails;
