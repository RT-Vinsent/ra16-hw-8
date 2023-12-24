import React, { useState } from 'react';
import './App.css';
import List from './components/task1/List/List';
import JsonFetch from './components/task2/JsonFetch/JsonFetch';
import AuthenticationComponent from './components/task3/AuthenticationComponent/AuthenticationComponent';

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
      <List />

      {/* Компонент задачи №2 */}
      <JsonFetch />

      {/* Компонент задачи №3 */}
      <AuthenticationComponent />
      
      {/* Просто подвал */}
      <footer className='footer'><p>Просто подвал</p></footer>
    </>
  );
}

export default App;
