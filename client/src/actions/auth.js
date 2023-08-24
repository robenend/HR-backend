import api from '../utils/api';
export const Login = async (EmployeeID, Password) => {
    const body = { EmployeeID, Password };
    try {
      const res = await api.post('/auth', body);
      // console.log(
      } catch (err) {
        console.log(err)
    }
  };