export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("tr-TR", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
