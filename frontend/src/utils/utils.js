import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.access).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => !!localStorage.getItem("refreshTokenTimestamp");

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
