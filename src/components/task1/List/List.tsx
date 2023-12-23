import React, { useState, useEffect } from 'react';
import './List.css';
import { Details } from '../Details/Details';

/**
 * Интерфейс для описания структуры данных пользователя.
 * @prop {string} id - Уникальный идентификатор пользователя.
 * @prop {string} name - Полное имя пользователя.
 */
interface User {
  id: string;
  name: string;
}

/**
 * Компонент List отображает список пользователей и детали выбранного пользователя.
 * При монтировании компонента выполняет запрос на получение списка пользователей
 * и обновляет состояние при их получении.
 * При клике на пользователя в списке отображает детальную информацию в компоненте Details.
 */
export const List: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Состояние для хранения списка пользователей.
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Состояние для хранения ID выбранного пользователя.

  // Побочный эффект для загрузки списка пользователей.
  useEffect(() => {
    // Функция для выполнения запроса к API и получения данных.
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        setUsers(data); // Обновление состояния списка пользователей данными с сервера.
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Вызов функции загрузки пользователей.
  }, []);

  // Рендеринг списка пользователей.
  return (
    <div className='container'>
      <h2>«Список и детали»</h2>
      <div className="list-container">
        <ul className="user-list">
          {users.map((user: User) => (
            <li
              key={user.id}
              onClick={() => setSelectedUserId(user.id)} // Обработчик клика по элементу списка, обновляющий выбранного пользователя.
              className={selectedUserId === user.id ? 'selected' : ''} // Применение класса 'selected' для выделения выбранного пользователя.
            >
              {user.name}
            </li>
          ))}
        </ul>
        {selectedUserId && <Details userId={selectedUserId} />}
      </div>
    </div>
  );
};

export default List;
