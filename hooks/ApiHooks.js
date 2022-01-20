import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async (start = 0, limit = 10) => {
    try {
      const response = await fetch(
        baseUrl + 'media' + '?start=' + start + '&limit=' + limit
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );

      setMediaArray(media);
    } catch (error) {
      console.error(error);
    }
    console.log(mediaArray);
  };

  // Call loadMedia() only once when the component is loaded
  useEffect(() => {
    loadMedia(0, 5);
  }, []);

  return {mediaArray};
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      // redirect: 'follow',
      // referrerPolicy: 'no-referrer',
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const response = await fetch(baseUrl + 'login', options);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const userData = await response.json();
      console.log('login ' + userData);
      return userData;
      // fetch('https://example.com/profile', {
      //   method: 'POST', // or 'PUT'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log('Success:', data);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(baseUrl + 'users/user', options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postUser = async (data) => {
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    try {
      // TODO: use fetch to send request to users endpoint and return the result as json, handle errors with try/catch and response.ok
      const response = await fetch(baseUrl + 'users', options);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const userData = await response.json();
      console.log('register ' + userData);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {getUserByToken, postUser};
};

export {useMedia, useLogin, useUser};
