import axios from 'axios';
export interface ILoginAuth {
  email: string;
  password: string;
}
export const LoginAuth = async ({
  email,
  password,
}: ILoginAuth): Promise<string | undefined> => {
  try {
    const response = await axios.post('http://localhost:3333/login', { email, password } ,{
    headers: {
        'User-Agent': navigator.userAgent,
      }, withCredentials: true 
    })
    localStorage.setItem('authToken', response.data.acessToken)
    alert('logado')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return 'Erro desconhecido'
  }
};