export const ITEMS_PER_PAGE = 10;

export const discountedPrice = (item) => {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
};

export function formatDisplayDateAndTime(dateString) {
  const date = new Date(dateString);

  // Format the date as "DD/MM/YYYY"
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  // Format the time in 12-hour format
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Combine the formatted date and time
  return `${formattedDate} at ${formattedTime}`;
}
