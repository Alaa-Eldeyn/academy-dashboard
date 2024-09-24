export const addUser = (token) => {
  localStorage.setItem("token", token);
};

export const removeUser = () => {
  localStorage.removeItem("token");
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  return token;
};
