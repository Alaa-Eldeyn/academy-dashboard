export const addToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const addUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
