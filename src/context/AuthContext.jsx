'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useLocalStorage } from '../hook/useLocalStorage';
import { loginService } from '@/services/auth.service';

const AuthContext = createContext({
  userData: '',
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', '');
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const login = useCallback(
    async (data) => {
      const response = await loginService(data);
      const { jwtToken, userInfor } = response.data.data;
      setUserInfo({ userInfo: userInfor, token: jwtToken });
      setAccessToken(jwtToken);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const logout = useCallback(() => {
    setUserInfo(JSON.stringify(''));
    setAccessToken('');
    setRefreshToken('');
  }, []);

  const value = useMemo(
    () => ({
      userData: userInfo,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
