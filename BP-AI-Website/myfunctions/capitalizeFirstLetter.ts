// capitalize first letter
export default function capitalizeFirstLetter(s: string, forAllWords = false) {
  if (forAllWords) {
    return s
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join(" ");
  }

  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
