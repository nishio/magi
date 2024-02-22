export const YesNoEmoji = ({ v }: { v: number }) => {
  let emoji;
  if (v === 2) {
    emoji = "👍"; // Strong Yes
  } else if (v === 1) {
    emoji = "👍"; // Yes
  } else if (v === 0) {
    emoji = "😐"; // Neutral
  } else if (v === -1) {
    emoji = "👎"; // No
  } else if (v === -2) {
    emoji = "👎"; // Strong No
  } else {
    emoji = "🤕"; // Default to error emoji if value not found
  }

  return emoji;
};
