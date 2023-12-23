import React, { useState } from 'react';
import './App.css';

/**
 * Главный компонент приложения
 * @returns {JSX.Element} - Основной элемент приложения
 */
function App(): JSX.Element {

  return (
    <>
      {/* шапка */}
      <header className='header'>
        <h1>Домашнее задание «Hooks & Context API»</h1>
        <h2>Задачи расположены последовательно в столбик</h2>
      </header>
      
      {/* Компонент задачи №1 */}
      {/* < /> */}

      {/* Компонент задачи №2 */}
      {/* < /> */}

      {/* Компонент задачи №3 */}
      {/* < /> */}
      
      {/* Просто подвал */}
      <footer className='footer'><p>Просто подвал</p></footer>
    </>
  );
}

export default App;
