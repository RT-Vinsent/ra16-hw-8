import React from 'react';
import './Profile.css';

/**
 * Определяет структуру данных профиля пользователя.
 */
interface ProfileData {
  name: string; // Имя пользователя
  avatar: string; // URL аватара пользователя
}

/**
 * Определяет свойства компонента Profile.
 */
interface ProfileProps {
  onLogout: () => void; // Функция для обработки выхода из системы
  profileData: ProfileData; // Данные профиля пользователя
}

/**
 * Компонент для отображения профиля пользователя.
 * 
 * @param onLogout Функция, вызываемая при нажатии на кнопку выхода.
 * @param profileData Данные профиля пользователя, включая имя и аватар.
 * @returns JSX элемент, отображающий профиль пользователя.
 */
const Profile: React.FC<ProfileProps> = ({ onLogout, profileData }) => {
  return (
    <div className="profile-container">
      <div className="profile-greeting">
        <span>Привет, {profileData.name}</span>
      </div>
      <div className="profile-image-container">
        <img src={profileData.avatar} alt="Profile" className="profile-image" />
      </div>
      <button onClick={onLogout} className="logout-button" type="button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
