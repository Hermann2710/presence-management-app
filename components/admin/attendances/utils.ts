// components/attendances/utils.ts
export const formatDateSafe = (dateString: string): string => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Date invalide"
    : date.toLocaleDateString("fr-FR");
};

export const formatTimeSafe = (timeString: string | null): string => {
  if (!timeString) return "--:--";
  const time = new Date(timeString);
  return isNaN(time.getTime())
    ? "--:--"
    : time.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
};
