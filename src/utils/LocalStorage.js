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

export const addID = (id) => {
  localStorage.setItem("id", id);
};

export const removeID = () => {
  localStorage.removeItem("id");
};

export const getID = () => {
  const id = localStorage.getItem("id");
  return id;
};
