export const getMyId = (cookies: string | undefined, key: string) => {
  const cookie = cookies?.split(";").find((cookie) => {
    const [cookieKey] = cookie.split("=");
    if (key === cookieKey.trim()) return cookie;
  });

  if (!cookie) return;

  return cookie.split("=")[1];
};
