import React, { useState, useEffect, useCallback } from 'react';
import { api, logout, getCurrentUser } from '../module/AuthService';
import LoginForm from '../LoginForm/LoginForm';
import NewsFeed from '../NewsFeed/NewsFeed';
import Profile from '../Profile/Profile';
import './AuthenticationComponent.css';
import WelcomeComponent from '../WelcomeComponent/WelcomeComponent';

interface ProfileData {
  name: string;
  avatar: string;
}

/**
 * Компонент для аутентификации пользователя.
 * Позволяет входить в систему, отображать профиль и новостную ленту.
 */
export const AuthenticationComponent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(getCurrentUser());
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loadingError, setLoadingError] = useState<boolean>(false);

  /**
   * Загружает данные профиля пользователя.
   * @param token Токен пользователя для запроса данных профиля.
   */
   const loadProfile = useCallback(async (token: string) => {
    try {
      setLoadingError(false);
      const profile = await api.getProfile(token);
      setProfileData(profile);
    } catch (error) {
      console.error('Ошибка при загрузке профиля:', error);
      setLoadingError(true);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        handleLogout();
      }
    }
  }, []);

  /**
   * Обрабатывает вход пользователя в систему.
   * @param username Имя пользователя.
   * @param password Пароль пользователя.
   */
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await api.authenticate(username, password);
      localStorage.setItem('user', response.token);
      setIsAuthenticated(true);
      setToken(response.token);
      await loadProfile(response.token);
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  /**
   * Обрабатывает выход пользователя из системы.
   */
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setToken(null);
    setProfileData(null);
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      loadProfile(token);
    }
  }, [token, loadProfile]);

  return (
    <div className="container">
      <h2>«Authentication»</h2>
      <div className="authentication-content">
        <header className="authentication-header">
          <div className="authentication-logo">Neto Social</div>
          <div className="authentication-login-form">
            {!isAuthenticated ? (
              <LoginForm onLogin={handleLogin} />
            ) : loadingError ? (
              <div>Ошибка загрузки профиля.</div>
            ) : profileData ? (
              <Profile onLogout={handleLogout} profileData={profileData} />
            ) : (
              <div>Загрузка профиля...</div>
            )}
          </div>
        </header>
        {(isAuthenticated && token) ? <NewsFeed token={token}/> : <WelcomeComponent />}
      </div>
    </div>
  );
};

export default AuthenticationComponent;
