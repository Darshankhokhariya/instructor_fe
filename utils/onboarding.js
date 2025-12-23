export const isTimeSlotValid = (start, end) => {
  if (!start || !end) return true;
  const [startH, startM] = start.split(":").map(Number);
  let [endH, endM] = end.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }
  const durationMinutes = endMinutes - startMinutes;
  const maxDurationMinutes = 5 * 60; // Max duration of 5 hours
  return durationMinutes <= maxDurationMinutes;
};

export const languageOptions = [
  "English",
  "Hindi",
  "Sanskrit",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Gujarati",
  "Marathi",
  "Bengali",
];
