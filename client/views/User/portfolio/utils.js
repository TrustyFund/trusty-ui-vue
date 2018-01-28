export const calcPortfolioBalanceData = ({
  balance, priceFirst, priceLast, multiplierFirst, multiplierLast
}) => {
  const balanceBTS = balance * priceLast;
  const balanceUSD = balanceBTS * multiplierLast;
  const change = Math.floor((((priceLast * multiplierLast) /
        (priceFirst * multiplierFirst)) * 100) - 100);
  return {
    balanceBTS, balanceUSD, change
  };
};
