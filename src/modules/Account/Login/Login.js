import React from 'react';

const Login = ({ location, account, facebookLogin, googleLogin, logout }) => (
  <div>
      <button onClick={facebookLogin}>Facebook</button>
      <button onClick={googleLogin}>Google</button>
  </div>
);

export default Login;