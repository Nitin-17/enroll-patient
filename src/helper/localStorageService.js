const _setLoginInfo = (tokenObj) => {
  console.log("tokenObj", tokenObj, typeof tokenObj);
  /*localStorage.setItem('accessToken', tokenObj.accessToken);
    localStorage.set('refreshToken', tokenObj.refreshToken);
    localStorage.set('updateToken', tokenObj.updateToken);
    localStorage.set('expirationTime', Date.now() + 58 * 60 * 1000);
    localStorage.set('userType', tokenObj.userType); */
};

const _getAccessToken = () => {
  return localStorage.getItem("accessToken") ? true : false;
};

export { _setLoginInfo, _getAccessToken };
