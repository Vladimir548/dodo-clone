import Cookies from 'js-cookie';

import { EnumTokens } from './auth.service';
import { jwtDecode } from 'jwt-decode';

interface IDataToken {
  userId: string;
  cartId:string
  iat: number;
  exp: number;
}


export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const getIdUser = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const dataToken = jwtDecode<IDataToken>(accessToken);
    return dataToken.userId;
  }
};
export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: 'localhost',
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
