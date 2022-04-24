import actions from './actions';
import axios from 'axios';
const baseUrl = 'https://secret-dawn-63355.herokuapp.com';
// const baseUrl = "http://localhost:5000"

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
      console.log(body)
      axiosOptions = getAxiosOptions("POST", `${baseUrl}/eart`, body, token)
      console.log(axiosOptions.data)
      response = await axios(axiosOptions)
      return response.data
      break
  }
 }catch(err){
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
        data: {
          ...body,
        },
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
