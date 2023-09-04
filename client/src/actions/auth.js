import base from '../utils/base';

export const Login = async (employeeID, password, rememberMe) => {
    const body = { employeeID, password, rememberMe };
    try {
      const result = await base.post('/auth', body);

      if (result.data?.accessToken && result.data?.accessToken !== null) {
        if (rememberMe) {
            localStorage.setItem('token', result.data?.accessToken)
        } else {
            sessionStorage.setItem('token', result.data?.accessToken)
        }

        localStorage.setItem('role', JSON.stringify(result.data?.role))

      }
            // console.log(
      } catch (err) {
        console.log(err)
    }
  };
