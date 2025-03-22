import axios from 'axios';

export const AuthToken = async () => {
  const authToken = localStorage.getItem('authToken');

  try {
    const auth = await axios.get('http://localhost:3333/auth', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'User-Agent': navigator.userAgent,
      },
      withCredentials: true,
    });

    const { acess, acessToken } = await auth.data;
    if (acessToken !== undefined) localStorage.setItem('authToken', acessToken);
    
    return acess;
  
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return { error: 'Erro desconhecido' };
  }
};

