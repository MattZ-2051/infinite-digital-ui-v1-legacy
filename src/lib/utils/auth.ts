export const setToken = ({
  access_token,
  refresh_token,
  expires_in,
  refresh_expires_in,
}) => {
  localStorage.setItem(
    "infinite-auth",
    JSON.stringify({
      access_token,
      refresh_token,
      expires_in,
      refresh_expires_in,
    })
  );
};