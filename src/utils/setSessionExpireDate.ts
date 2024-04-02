export const setSessionExpireDate = ({ days }: { days: number }) => {
  const expireDateInMilliseconds = days * 24 * 60 * 60 * 1000;
  const expireDate = new Date(new Date().getTime() + expireDateInMilliseconds);

  return expireDate;
};
