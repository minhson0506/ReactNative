import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

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
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    const userData = await doFetch(baseUrl + 'login', options);
    return userData;
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    const userData = await doFetch(baseUrl + 'users/user', options);
    return userData;
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    const userData = await doFetch(baseUrl + 'users', options);
    return userData;
  };

  return {getUserByToken, postUser};
};

const useTag = () => {
  const postTag = async (tagData, data) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + 'tags/', options);
  };

  const getFileByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };

  return {postTag, getFileByTag};
};

export {useMedia, useLogin, useUser, useTag};
