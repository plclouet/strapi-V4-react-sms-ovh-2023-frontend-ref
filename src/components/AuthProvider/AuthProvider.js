import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { signinAuth, signoutAuth } from "../../apis/auth";
import { AuthContext } from "../../context";
import Cookies from 'js-cookie';

function AuthProvider({ children }) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);

  async function signin(credentials) {
    const body = await signinAuth(credentials);
    const newUser = body.user.username;
    const newJWT = body.jwt;
    Cookies.set('strapiUser', newUser);
    Cookies.set('strapiJWT', newJWT);
    setUser(newUser);
  }

  async function signout() {
    await signoutAuth();
    setUser(null);
  }
console.log("user in provider", user);
  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;