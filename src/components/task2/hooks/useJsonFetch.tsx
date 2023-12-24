import { useState, useEffect } from 'react';

// Определение интерфейса для параметров запроса, расширяющего стандартный RequestInit
interface FetchOptions extends RequestInit {}

// Определение интерфейса для состояния запроса, включающего данные, статус загрузки и ошибку
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Хук `useJsonFetch` используется для выполнения HTTP запросов и получения ответа в формате JSON.
 * 
 * @param url {string} URL-адрес запроса.
 * @param opts {FetchOptions} Необязательные параметры запроса, расширяющие стандартный RequestInit.
 * @returns {FetchState<T>} Возвращает объект состояния запроса, содержащий данные (`data`), статус загрузки (`loading`) и объект ошибки (`error`).
 * 
 * @template T Тип данных, который ожидается в ответе.
 * 
 * Использует React хуки `useState` и `useEffect` для управления состоянием запроса.
 * При изменении `url` или `opts` хук повторно выполняет запрос.
 */
function useJsonFetch<T>(url: string, opts?: FetchOptions): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Асинхронная функция для выполнения запроса
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, opts);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json() as T;
        setData(json);
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error('Unknown error occurred'));
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, opts]);

  return { data, loading, error };
}

export default useJsonFetch;
