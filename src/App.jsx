import { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";

function App() {
  const [productName, setProductName] = useState("");
  const [zone, setZone] = useState("");
  const [event, setEvent] = useState("");
  const [result, setResult] = useState(null);

  //voice recording state
const [isRecording, setIsRecording] = useState(false);
const [mediaRecorder, setMediaRecorder] = useState(null);
const [audioBlob, setAudioBlob] = useState(null);
 //start recording function
 async function startRecording() {
  setIsRecording(true);

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);

  const chunks = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    setAudioBlob(blob);
  };

  recorder.start();
  setMediaRecorder(recorder);
}

function stopRecording() {
  setIsRecording(false);
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
}


 async function handleSubmit() {
  const params = new URLSearchParams();

  if (productName.trim() !== "") params.append("productName", productName);
  if (zone.trim() !== "") params.append("zone", zone);
  if (event.trim() !== "") params.append("event", event);

  // If you have audio, send POST instead of GET
  if (audioBlob) {
    const formData = new FormData();
    formData.append("audio", audioBlob); //sends audio file to backend
    formData.append("productName", productName);
    formData.append("zone", zone);
    formData.append("event", event);

    const response = await fetch(`/api/transcribe-audio`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
    return;
  }

  // otherwise default GET request
  const response = await fetch(`/api/transcribe?${params.toString()}`, {
    method: "GET",
  });

  const data = await response.json();
  setResult(data);
}


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <TextField
          label="Product Name (optional)"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <TextField
          label="Zone (optional)"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />

        <TextField
          label="Event (optional)"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        />
<Button
       color={isRecording ? "error" : "primary"}
  onClick={isRecording ? stopRecording : startRecording}
>
  {isRecording ? "Stop Recording" : "Start Recording"}
</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>

        {result && (
          <pre style={{ background: "#eee", padding: "12px" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </Stack>
    </Container>
  );
}

export default App;

