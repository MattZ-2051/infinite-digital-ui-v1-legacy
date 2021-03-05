const tokenKey = process.env.REACT_APP_API_TOKEN_KEY as string;

export const setToken = ({
  access_token,
  refresh_token,
  expires_in,
  refresh_expires_in,
}) => {
  localStorage.setItem(
    tokenKey,
    JSON.stringify({
      access_token,
      refresh_token,
      expires_in,
      refresh_expires_in,
    })
  );
};

export const getToken = () => {
  const storedToken = localStorage.getItem(tokenKey);
  if (storedToken) {
    try {
      const token = JSON.parse(storedToken);
      return token;
    } catch (e) {
      return null;
    }
  }
  return null;
};

export function deleteToken() {
  localStorage.removeItem(tokenKey);
}
