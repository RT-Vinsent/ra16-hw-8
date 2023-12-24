interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
  requiresToken?: boolean;
}

/**
 * Отправляет HTTP запрос к API.
 * 
 * @param url URL для запроса.
 * @param options Настройки запроса, включая метод, заголовки и тело.
 * @param token Токен аутентификации, добавляемый в заголовки при необходимости.
 * @returns Промис с ответом от сервера в формате JSON.
 * @throws Ошибка, если запрос не удался или вернулся с ошибкой авторизации.
 */
async function fetchAPI(url: string, options: FetchOptions = {}, token: string | null = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.requiresToken && token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL || ''}${url}`, {
    method: options.method || 'GET',
    headers: headers,
    body: options.body || null,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized access - invalid token');
  }
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API call failed with status ${response.status}: ${errorBody}`);
  }

  return response.json();
}

export const api = {
  /**
   * Аутентифицирует пользователя.
   * 
   * @param username Имя пользователя.
   * @param password Пароль.
   * @returns Промис с ответом от сервера.
   */
  authenticate: async (username: string, password: string) => {
    const response = await fetchAPI('/auth', {
      method: 'POST',
      body: JSON.stringify({ login: username, password: password })
    });
    return response;
  },
  
  /**
   * Получает профиль пользователя.
   * 
   * @param token Токен аутентификации пользователя.
   * @returns Промис с данными профиля пользователя.
   */
  getProfile: (token: string) => 
    fetchAPI('/private/me', { requiresToken: true }, token),

  /**
   * Получает новостную ленту.
   * 
   * @param token Токен аутентификации пользователя.
   * @returns Промис с новостной лентой.
   */
  getNews: (token: string) => 
    fetchAPI('/private/news', { requiresToken: true }, token),
  // Другие методы API
};

export const logout = (): void => {
  /**
   * Выходит из системы, удаляя токен пользователя из localStorage.
   */
  localStorage.removeItem('user');
};

export const getCurrentUser = (): string | null => {
  /**
   * Получает текущего пользователя из localStorage.
   * 
   * @returns Токен текущего пользователя или null, если пользователь не аутентифицирован.
   */
  return localStorage.getItem('user');
};
