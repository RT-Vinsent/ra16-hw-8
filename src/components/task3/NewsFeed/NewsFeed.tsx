import React, { useState, useEffect } from 'react';
import { api, getCurrentUser } from '../module/AuthService';
import './NewsFeed.css';

interface NewsItem {
  id: string;
  title: string;
  image: string;
  content: string;
}

interface NewsFeedProps {
  token: string;
}

/**
 * Компонент для отображения ленты новостей.
 * 
 * @param token Токен аутентификации пользователя для доступа к новостям.
 * @returns Элементы ленты новостей или сообщение об ошибке.
 */
export const NewsFeed: React.FC<NewsFeedProps> = ({ token }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Асинхронная функция для получения новостей.
     */
    const fetchNews = async () => {
      try {
        const currentToken = getCurrentUser();
        if (!currentToken) {
          setError('Токен не найден');
          setLoading(false);
          return;
        }

        const newsResponse = await api.getNews(currentToken);
        if (Array.isArray(newsResponse)) {
          setNews(newsResponse);
        } else {
          throw new Error('Ответ сервера не является массивом новостей');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Произошла ошибка при получении новостей');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="news-feed">
      {news.map((item) => (
        <div key={item.id} className="news-item">
          <div className="news-foto">
            <img src={`${item.image}?random=${item.id}`} alt={item.title} className="news-image" />
          </div>
          <h3 className="news-title">{item.title}</h3>
          <p className="news-content">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
