import api from '../../api/api';

export const requireValidate = async (object) => {
  const objectValidate = {
    name: object.name,
    email: object.email,
    password: object.password,
  }
  const result = await api.post('/valid-passwords/results', objectValidate);

  return result;
}
