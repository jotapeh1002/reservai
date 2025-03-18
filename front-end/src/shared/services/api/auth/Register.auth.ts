import axios from 'axios';
export interface IRegisterAuth {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone: string;
}
export const RegisterAuth = async ({
  name,
  email,
  password,
  photo,
  phone,
}: IRegisterAuth): Promise<string | undefined> => {
  try {
    const response = await axios.post('http://localhost:3333/register', {
      name,
      email,
      password,
      photo,
      phone
    })
    localStorage.setItem('authToken', response.data)
    alert('usuario criado')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error.message;
    }
    return 'Erro desconhecido'
  }
};
