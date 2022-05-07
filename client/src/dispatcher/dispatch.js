import actions from './actions';
import axios from 'axios';
// const baseUrl = 'https://secret-dawn-63355.herokuapp.com';
const baseUrl = "http://localhost:5000"

const dispatch = async (action, headerParams = {}, body = {}, token = '') => {
 try{
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
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/user`, body, token)
      response = await axios(axiosOptions);
      return response.data;
      break
    case actions.addEArt:
      axiosOptions = getAxiosOptions("POST", `${baseUrl}/eart`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.addGallery:
      axiosOptions = getAxiosOptions("POST", `${baseUrl}/gallery`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getGalleries:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/gallery`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getOwnedEarts:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/eart/getearts/owned`,{}, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.uploadProfileImage:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/user/profileImage`, body, token)
      response = await axios(axiosOptions)
      return response.data  
      break
    case actions.editEart:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/eart/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getEart:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/eart/geteart/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.postForSale:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/eart/forSale/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data  
      break
    case actions.unlistEart:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/eart/forSale/unlist/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getAllEarts:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/eart`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.createEdition:
      axiosOptions = getAxiosOptions("POST", `${baseUrl}/edition/eart/${headerParams.eartId}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getEartEditions:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/edition/eart/${headerParams.eartId}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.changeOwner:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/eart/changeOwner/buy`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.createCopyEart:
      axiosOptions = getAxiosOptions("POST", `${baseUrl}/copyeart/`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getCopyEarts:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/copyeart/`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getCopyEart:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/copyeart/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getGalleryEarts:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/eart/gallery/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.changePrivacy:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/gallery/privacy/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.uploadGalleryImage:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/gallery/galleryImage/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getUserProfile:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/user/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getUserOwnedArts:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/eart/getuserearts/${headerParams.type}/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getUserCopyEarts:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/copyeart/user/${headerParams.id}`,body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.editGallery:
      axiosOptions = getAxiosOptions("PUT", `${baseUrl}/gallery/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
    case actions.getGallery:
      axiosOptions = getAxiosOptions("GET", `${baseUrl}/gallery/${headerParams.id}`, body, token)
      response = await axios(axiosOptions)
      return response.data
      break
  }
 }catch(err){
   console.log(err)
    return err.response.data
 }
};

const getAxiosOptions = (method, url, body, token) => {
  console.log(token);
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
        data: body
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
