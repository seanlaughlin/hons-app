export function generateHourStrings() {
  const hourStrings = [];
  for (let i = 0; i < 24; i++) {
    const hourString = i.toString().padStart(2, "0") + ":00";
    hourStrings.push(hourString);
  }
  return hourStrings;
}
