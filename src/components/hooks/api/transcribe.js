export async function transcribe({ product, zone, event }) {
  const params = new URLSearchParams({
    product,
    zone,
    event
  });
//Send the get request to the API endpoint with the provided parameters
  const response = await fetch(`/api/transcribe?${params.toString()}`);

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}
