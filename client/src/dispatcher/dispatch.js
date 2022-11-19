import actions from './actions';
import axios from 'axios';
// const baseUrl = 'https://secret-dawn-63355.herokuapp.com';
const baseUrl = 'https://restapi.haveeart.com';
// const baseUrl = 'http://localhost:5000';

const dispatch = async (action, headerParams = {}, body = {}, token = '') => {
  try {
    let axiosOptions = {};
    let response = {};
    switch (action) {
      case actions.signUp:
        axiosOptions = getAxiosOptions(
          'POST',
          baseUrl + '/user/signup',
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.login:
        axiosOptions = getAxiosOptions(
          'POST',
          baseUrl + '/user/login',
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getMyProfile:
        axiosOptions = getAxiosOptions('GET', baseUrl + '/user', {}, token);
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.editProfile:
        axiosOptions = getAxiosOptions('PUT', `${baseUrl}/user`, body, token);
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.attachPaymentMethod:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/user/payment/method/attach`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getPaymentMethods:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/user/payment/methods`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.createPaymentIntent:
        axiosOptions = getAxiosOptions(
          'POST',
          `${baseUrl}/user/payment/create`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.confirmPaymentIntent:
        axiosOptions = getAxiosOptions(
          'POST',
          `${baseUrl}/user/payment/confirm`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.addEArt:
        axiosOptions = getAxiosOptions('POST', `${baseUrl}/eart`, body, token);
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.addGallery:
        axiosOptions = getAxiosOptions(
          'POST',
          `${baseUrl}/gallery`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getGalleries:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/gallery`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getOwnedEarts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/eart/getearts/owned`,
          {},
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.uploadProfileImage:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/user/profileImage`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.editEart:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/eart/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getEart:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/eart/geteart/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.postForSale:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/eart/forSale/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.unlistEart:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/eart/forSale/unlist/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getAllEarts:
        axiosOptions = getAxiosOptions('GET', `${baseUrl}/eart`, body, token);
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.createEdition:
        axiosOptions = getAxiosOptions(
          'POST',
          `${baseUrl}/edition/eart/${headerParams.eartId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getEartEditions:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/edition/eart/${headerParams.eartId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.changeOwner:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/eart/changeOwner/buy`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.createCopyEart:
        axiosOptions = getAxiosOptions(
          'POST',
          `${baseUrl}/copyeart/`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getCopyEarts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/copyeart/`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getCopyEart:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/copyeart/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getGalleryEarts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/eart/gallery/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.changePrivacy:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/gallery/privacy/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.uploadGalleryImage:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/gallery/galleryImage/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getUserProfile:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/user/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getUserOwnedArts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/eart/getuserearts/${headerParams.type}/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getUserCopyEarts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/copyeart/user/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.editGallery:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/gallery/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getGallery:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/gallery/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getUserGalleries:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/gallery/user/${headerParams.userId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.followUser:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/user/follow/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.unfollowUser:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/user/unfollow/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.followEart:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/eart/follow/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.unfollowEart:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/eart/unfollow/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getNotifications:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/notification`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getNotificationsNotViewed:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/notification/notViewed`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.createRoom:
        axiosOptions = getAxiosOptions('POST', `${baseUrl}/room`, body, token);
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getRooms:
        axiosOptions = getAxiosOptions('GET', `${baseUrl}/room`, body, token);
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getRoomMessages:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/message/${headerParams.roomId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getRoom:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/room/${headerParams.id}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.sendMessage:
        axiosOptions = getAxiosOptions(
          'POST',
          `${baseUrl}/message/${headerParams.roomId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.viewNotifications:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/notification/viewNotifications`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getUserActiveSessions:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/session/getActiveSessions/${headerParams.userId}`
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getLastMessage:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/message/getLastMessage/${headerParams.roomId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getNotViewedMessageCount:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/message/notViewedCount/${headerParams.roomId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.viewAllMessages:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/message/viewMessages/${headerParams.roomId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getMessagesLastPage:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/message/getLastPage/${headerParams.roomId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getMessagePage:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/message/getPage/${headerParams.roomId}/${headerParams.pageNo}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.roomExists:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/room/roomexists/${headerParams.userId}`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
      case actions.getFollowedUsers:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/user/get/following`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
      case actions.getFollowedEarts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/eart/get/following`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
      case actions.getBoughtEarts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/eart/getearts/bought`,
          {},
          token
        );
        response = await axios(axiosOptions);
        return response.data;
        break;
      case actions.getForsaleEarts:
        axiosOptions = getAxiosOptions(
          'GET',
          `${baseUrl}/eart/getearts/forSale`,
          {},
          token
        );
        response = await axios(axiosOptions);
        return response.data;
      case actions.changePassword:
        axiosOptions = getAxiosOptions(
          'PUT',
          `${baseUrl}/user/change/password`,
          body,
          token
        );
        response = await axios(axiosOptions);
        return response.data;
    }
  } catch (err) {
    throw err;
  }
};

const getAxiosOptions = (method, url, body, token) => {
  const headers = {
    'x-auth-token': token,
    'Content-Type': 'application/json',
  };
  switch (method) {
    case 'GET':
      return {
        method: 'GET',
        url,
        headers,
      };
      break;
    case 'POST':
      return {
        method: 'POST',
        url,
        headers,
        data: body,
      };
      break;
    case 'PUT':
      return {
        method: 'PUT',
        url,
        headers,
        data: body,
      };
      break;
    case 'DELETE':
      return {
        method: 'DELETE',
        url,
        headers,
      };
      break;
  }
};

export default dispatch;
