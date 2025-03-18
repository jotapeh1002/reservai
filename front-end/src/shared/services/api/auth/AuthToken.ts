import axios from 'axios';

export const AuthToken = async () => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    throw new Error('Token de autenticação não encontrado');
  }
  try {
    await axios.get('http://localhost:3333/auth', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data || error.message };
    }
    return { error: 'Erro desconhecido' };
  }
};
