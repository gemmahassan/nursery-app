// parse user details stored in JWT
// if there is an access token, store it in x-access-token header to be passed with API requests
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
