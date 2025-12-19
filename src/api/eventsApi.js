// src/api/eventsApi.js
export async function sendEvent({ productName, location, event, transcript }) {
  const response = await fetch(
    "https://ni8j6iezcc.execute-api.us-east-1.amazonaws.com/prod",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: {
          product_name: productName || undefined,
          location: location || undefined,
          event: event || undefined,
          transcript: transcript || undefined,
        },
      }),
    }
  );

  return response.json();
}
