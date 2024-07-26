import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  jwt.sign(
    {
      username: user.username,
    },
    "PFfZJKcD1PwsqLhntEA7m4eV9io6g3fy",
    {
      expiresIn: "1d",
    },
    (error, token) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Error with token" });
      } else {
        res.header('Authorization', token).json({ token });
      }
    }
  );
};

export default generateToken;