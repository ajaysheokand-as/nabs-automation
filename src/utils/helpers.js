export const formatAmount = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return "";

  const absAmount = Math.abs(amount);
  if (absAmount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (absAmount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (absAmount >= 1_000) {
    return (amount / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return Math.floor(amount).toString();
};
