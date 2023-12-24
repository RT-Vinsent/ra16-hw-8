import React from 'react';
import './WelcomeComponent.css';

/**
 * Компонент для отображения приветственного сообщения.
 * 
 * Этот компонент представляет собой приветственное сообщение для приложения "Neto Social",
 * которое описывает его как конкурента Facebook и VK.
 * @returns JSX элемент, содержащий приветственное сообщение.
 */
const WelcomeComponent = () => {
  return (
    <div className="welcome-container">
      <h1>Neto Social</h1>
      <p>Facebook and VK killer.</p>
    </div>
  );
};

export default WelcomeComponent;
