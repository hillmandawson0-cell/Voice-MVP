import { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { sendEvent } from "./api/eventsApi";
import { transcribe } from "./components/hooks/api/transcribe.js";

function App() {
  const [productName, setProductName] = useState("");
  const [zone, setZone] = useState("");
  const [event, setEvent] = useState("");
  const [result, setResult] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  async function startRecording() {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      setAudioBlob(new Blob(chunks, { type: "audio/webm" }));
    };

    recorder.start();
    setMediaRecorder(recorder);
  }

  function stopRecording() {
    setIsRecording(false);
    mediaRecorder?.stop();
  }

  async function handleSubmit() {
    let transcript = "";

    if (audioBlob) {
      transcript = await transcribeAudio(audioBlob);
    }

    const response = await sendEvent({
      productName,
      location: zone,
      event,
      transcript,
    });

    setResult(response);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <TextField label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <TextField label="Zone" value={zone} onChange={(e) => setZone(e.target.value)} />
        <TextField label="Event" value={event} onChange={(e) => setEvent(e.target.value)} />

        <Button color={isRecording ? "error" : "primary"} onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>

        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </Stack>
    </Container>
  );
}

export default App;
