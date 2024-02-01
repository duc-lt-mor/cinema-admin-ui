export function toVnTimezone(dateString: string) {
  const date = new Date(dateString);
  date.setHours(date.getUTCHours());
  return date.toISOString();
}
