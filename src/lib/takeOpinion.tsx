export const takeOpinion = (text: string) => {
  text = text.toUpperCase();
  if (text.startsWith("STRONG YES")) {
    return { v: 2, text: "STRONG YES" };
  } else if (text.startsWith("YES")) {
    return { v: 1, text: "Yes" };
  } else if (text.startsWith("NEUTRAL")) {
    return { v: 0, text: "Neutral" };
  } else if (text.startsWith("NO")) {
    return { v: -1, text: "No" };
  } else if (text.startsWith("STRONG NO")) {
    return { v: -2, text: "STRONG NO" };
  }
  return { v: 0.5, text: "System Error" };
};
