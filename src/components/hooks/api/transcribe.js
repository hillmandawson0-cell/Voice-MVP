/*
Talking to the API endpoint
fetch 
returning data
no ui logic
no event handlers
*/

export async function sendEvent({
  product,
  zone,
  event,
  transcript
}) {
  const payload = {
    product_name: product || undefined,
    location: zone || undefined,
    event: event || undefined,
    transcript: transcript || undefined
  };

  const response = await fetch(
    "https://ni8j6iezcc.execute-api.us-east-1.amazonaws.com/prod",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ body: payload })
    }
  );

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

