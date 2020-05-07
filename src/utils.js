//format price
const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
  return formattedPrice;
};

// format date
const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("fr-FR");
  return formattedDate;
};

export { formatPrice, formatDate };
