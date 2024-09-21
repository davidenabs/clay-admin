export const maskNumber = (numberString) => {
  return `**** ${numberString.slice(-4)}`;
};

export const calculatePercentage = (amountSpent, loanLimit) => {
  if (loanLimit === 0) return 0;
  return parseFloat(((amountSpent / loanLimit) * 100).toFixed(2));
};

export const splitFullName = (fullName) => {
  const [firstName, lastName] = fullName.split(" ");
  return { firstName, lastName };
};

export const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};

export const formatNumberWithCommas = (num) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const getPrefix = (str) => {
  return str.split("_")[0];
};

export const updateFormState = (setFormState, field, value) => {
  setFormState((prevState) => ({
    ...prevState,
    [field]: value,
  }));
};

export  function formatString(input) {
  const prefix = 'CUS_';
  if (input.startsWith(prefix)) {
    // Keep the prefix intact and convert the rest to lowercase
    return prefix + input.slice(prefix.length).toLowerCase();
  }
  // If input doesn't start with 'CUS_', return the input as-is or handle the case
  return input.toLowerCase();
}

