import React, { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
  /**
   * Функция, вызываемая при отправке формы.
   * @param username - имя пользователя.
   * @param password - пароль пользователя.
   */
  onLogin: (username: string, password: string) => void;
}

/**
 * Компонент формы входа.
 * 
 * @param onLogin Функция, вызываемая при отправке формы.
 * Предоставляет введённые пользователем данные для аутентификации.
 * @returns JSX элемент формы для входа в систему.
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  // Состояния для управления вводом имени пользователя и пароля
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  /**
   * Обрабатывает отправку формы.
   * @param event - событие формы.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращение стандартного поведения формы
    onLogin(username, password); // Вызов функции onLogin с текущими значениями состояний
  };

  return (
    <form className="auth-profile" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
        autoComplete="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        autoComplete="current-password"
      />
      <button className="login-button" type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
