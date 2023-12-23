import React, { useState, useEffect } from 'react';
import './Details.css';

/**
 * Интерфейс для свойств компонента Details.
 * @prop {string} userId - ID пользователя, для которого нужно загрузить и отобразить детали.
 */
interface DetailsProps {
  userId: string;
}

/**
 * Интерфейс для структуры данных пользователя, получаемых с сервера.
 * @prop {number} id - ID пользователя.
 * @prop {string} name - Полное имя пользователя.
 * @prop {string} avatar - URL изображения аватара пользователя.
 * @prop {object} details - Объект с дополнительными деталями о пользователе.
 * @prop {string} details.city - Город, в котором проживает пользователь.
 * @prop {string} details.company - Название компании, в которой работает пользователь.
 * @prop {string} details.position - Должность пользователя в компании.
 */
interface UserDetails {
  id: number;
  name: string;
  avatar: string;
  details: {
    city: string;
    company: string;
    position: string;
  };
}

/**
 * Компонент Details отображает детальную информацию о выбранном пользователе.
 * При первом рендере или изменении ID пользователя выполняется запрос на сервер для загрузки данных.
 * @param {DetailsProps} props - Свойства, принимаемые компонентом.
 */
export const Details: React.FC<DetailsProps> = ({ userId }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  // Эффект для загрузки данных пользователя при изменении userId.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${userId}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserDetails = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Если данные о пользователе не загружены, возвращаем индикатор загрузки.
  // if (!userDetails) {
  //   return <div className="details-container"><p>Loading...</p></div>;
  // }

  // URL аватара пользователя с добавлением случайного параметра для предотвращения кэширования.
  const avatarUrl = `${userDetails?.avatar}?random=${Math.random()}`;

  // Отображение детальной информации о пользователе.
  return (
    <div className="details-container">
      {userDetails ? (
        <div className="user-details">
          <div className="user-foto">
            <img src={avatarUrl} alt={`Avatar of ${userDetails.name}`} />
          </div>
          <div className="user-content">
            <h2>{userDetails.name}</h2>
            <p><strong>City:</strong> {userDetails.details.city}</p>
            <p><strong>Company:</strong> {userDetails.details.company}</p>
            <p><strong>Position:</strong> {userDetails.details.position}</p>
          </div>
        </div>
      ) : (
        <div className="details-loading">Loading...</div>
      )}
    </div>
  );
};
