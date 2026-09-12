// Time formatting and calculation utilities

export const formatSecondsToDigital = (totalSeconds: number): string => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatMinutesToReadable = (minutes: number): string => {
  if (minutes <= 0) return '0m';
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hrs > 0 && mins > 0) {
    return `${hrs}h ${mins}m`;
  }
  if (hrs > 0) {
    return `${hrs}h`;
  }
  return `${mins}m`;
};

export const formatSecondsToReadable = (seconds: number): string => {
  if (seconds <= 0) return '0m';
  const mins = Math.round(seconds / 60);
  return formatMinutesToReadable(mins);
};

// Converts "16:00" to "4:00 PM"
export const format24hTo12h = (time24: string): string => {
  if (!time24) return '';
  const parts = time24.split(':');
  if (parts.length < 2) return time24;

  let hour = parseInt(parts[0], 10);
  const minute = parts[1];
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour ? hour : 12; // '0' becomes '12'

  return `${hour}:${minute} ${ampm}`;
};

export const calculateMinutesBetween = (startTime: string, endTime: string): number => {
  if (!startTime || !endTime) return 0;
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return 0;

  let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  if (totalMinutes < 0) {
    // Spans past midnight
    totalMinutes += 24 * 60;
  }
  return totalMinutes;
};

export const formatDisplayDate = (dateStr: string): string => {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const getGreetingMessage = (): { greeting: string; subtitle: string } => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return {
      greeting: 'A gentle morning beginning.',
      subtitle: 'Set intentional rhythms and embrace quiet clarity.',
    };
  } else if (hour < 17) {
    return {
      greeting: 'A peaceful afternoon focus.',
      subtitle: 'Savor steady progress with mindful pacing.',
    };
  } else {
    return {
      greeting: 'A tranquil evening reflection.',
      subtitle: 'Honoring the day’s journey and releasing expectations.',
    };
  }
};
