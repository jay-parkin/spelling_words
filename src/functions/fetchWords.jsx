export async function fetchWords() {
  try {
    const response = await fetch("https://example.com/api/words"); // Replace with your API URL
    const data = await response.json();
    return data.words; // Assuming the API response has a 'words' field
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
}
