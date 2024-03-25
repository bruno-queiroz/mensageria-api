export const isSessionExpired = (expires: Date) => {
  const now = new Date();
  return now > expires;
};
