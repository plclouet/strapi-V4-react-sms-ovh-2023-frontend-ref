import Cookies from 'js-cookie';

const {REACT_APP_API_URL } = process.env;

export async function signinAuth(credentials) {
  // console.log( "REACT_APP_API_URL", REACT_APP_API_URL);
  const response = await fetch(`${REACT_APP_API_URL}/api/auth/local` , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: credentials.email,
      password: credentials.password,
    }),
  });
  const body = await response.json();
  if (response.ok) {
    console.log("body", body);
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}

export async function getCurrentUser() {
  let currentUser = Cookies.get("strapiUser");
  console.log("currentUser", currentUser);
  if (currentUser === undefined) {
    return "";
  }
  return currentUser;
}


export async function signoutAuth() {
  //localStorage.removeItem("JWT_REPORTS");
  Cookies.remove('strapiUser', { path:'/'});
  Cookies.remove('strapiJWT', { path:'/'});
}