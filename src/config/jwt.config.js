import jwt from 'jsonwebtoken';

const getToken = (payload) => {
  return jwt.sign({
    data: payload
  }, 'PFfZJKcD1PwsqLhntEA7m4eV9io6g3fy',
    { expiresIn: '1d' });
}

const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, 'PFfZJKcD1PwsqLhntEA7m4eV9io6g3fy', (err, decode) => {
    if (err) {
      console.log('Error getting token data');
    } else {
      data = decode;
    }
  });
  return data;
}

export { getToken, getTokenData }