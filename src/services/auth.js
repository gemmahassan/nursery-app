// remove stored user/JWT from localStorage
const logout = () => {
  localStorage.removeItem("user");
};

// get user from local storage, parse details stored in JWT
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  logout,
  getCurrentUser,
};
