export const setSessionExpireDate = ({ days }: { days: number }) => {
  const oneMonthInMilliseconds = days * 24 * 60 * 60 * 1000;
  const expireDate = new Date(new Date().getTime() + oneMonthInMilliseconds);

  return expireDate;
};
