import merge from 'lodash/merge'
// import Cookies from 'js-cookie'
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch'

import { apiUrl } from './apiUrl';

const LOCALSTORAGE_NAME = 'PivotCareUser'

const retrieveToken = () => window.localStorage.getItem(LOCALSTORAGE_NAME)
const saveToken = tokens => window.localStorage.setItem(LOCALSTORAGE_NAME, tokens)
const clearToken = () => window.localStorage.removeItem(LOCALSTORAGE_NAME)

// const COOKIE_NAME = 'MYAPP'

// const retrieveToken = () => Cookies.get(COOKIE_NAME)
// const saveToken = token => Cookies.set(COOKIE_NAME, token)
// const clearToken = () => Cookies.remove(COOKIE_NAME)

const fetchJSONWithToken = async (url, options = {}) => {
  const storedTokens = retrieveToken();
  if (!storedTokens) {
      return;
  }
  const { accessToken, accessExpiresIn, refreshToken, refreshExpiresIn } = JSON.parse(storedTokens);  

  let optionsWithToken = options;
  if (accessToken != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        // "access-token": "no token", // Test code
        // "refresh-token": "no", // Test code
        "access-token": `${accessToken}`,
        "refresh-token": `${refreshToken}`,
        "access-expiration-date": `${accessExpiresIn}`,
        "refresh-expiration-date": `${refreshExpiresIn}`  
      }
    })
  }

  // console.log(fetchJSON(url, optionsWithToken));

  return await fetchJSON(url, optionsWithToken)
}

const login = async (url, email, password, userType) => {
  return fetchJSON(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      userType
    })
  })
    .then(response => {
        // console.log(response);
        saveToken(JSON.stringify(response.body));
        return response;
    })
}

const logout = () => {
    const storedTokens = retrieveToken();
    JSON.parse(storedTokens);
    const { userType, authId, accessToken, refreshToken, refreshExpiresIn } = storedTokens;
    return fetchJSONWithToken( `${apiUrl}/logout`, {
        method: 'POST',
        headers: {
            // "refresh-token": `${refreshToken}`,
            // "refresh-expiration-date": `${refreshExpiresIn}`
        }
    })
    .then((result) => {
      clearToken();
      return result;
    })
    .catch((error)=>{
      return error;
    })
}

const shouldRefreshToken = error =>
  error.response.status === 401 &&
  error.body.message === 'Token has expired'

const refreshToken = async () => {
    const storedTokens = retrieveToken();
    if (!storedTokens) {
        return;
    }
    const { userType, authId, accessToken, refreshToken, refreshExpiresIn } = JSON.parse(storedTokens);  
    // console.log(refreshToken);
    return fetchJSONWithToken(`${apiUrl}/token`, {
        method: 'POST',
        headers: {
          // "refresh-token": `${refreshToken}`,
          // "refresh-expiration-date": `${refreshExpiresIn}`
      }
  })
    .then(response => {
        saveToken(JSON.stringify(response.body));
        // console.log(response)
        return response;
    })
    .catch(error => {
      // Clear token and continue with the Promise catch chain
      clearToken()
      throw error
    })
}

const customFetch = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken
})

export {
  customFetch,
  login,
  logout,
  fetchJSONWithToken,
  refreshToken
}