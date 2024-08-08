import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
  console.log(data)
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  console.log(refreshTokenTimestamp)
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => !!localStorage.getItem("refreshTokenTimestamp");

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
