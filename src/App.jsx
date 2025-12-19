/*
UI
Form state
Button clicks
Voice transcription state
Calling API functions
*/

import { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { sendEvent } from "./components/hooks/api/transcribe.js";
import { useSpeechRecognition } from "./components/hooks/useSpeechRecognition";


function App() {
  const [productName, setProductName] = useState("");
  const [zone, setZone] = useState("");
  const [event, setEvent] = useState("");
  const [result, setResult] = useState(null);
const {
  transcript,
  isListening,
  startListening,
  stopListening,
  setTranscript
} = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      setAudioBlob(new Blob(chunks, { type: "audio/webm" }));
    };

    recorder.start();
  }

  

  async function handleSubmit() {
    let transcript = "";
  try {
    const data = await sendEvent({
      product: productName,
      zone,
      event,
      transcript
    });

    setResult(data);
  } catch (err) {
    console.error(err);
  }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <TextField label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <TextField label="Zone" value={zone} onChange={(e) => setZone(e.target.value)} />
        <TextField label="Event" value={event} onChange={(e) => setEvent(e.target.value)} />

      

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>

<Button
  variant="contained"
  color={isListening ? "error" : "primary"}
  onClick={isListening ? stopListening : startListening}
>
  {isListening ? "Stop Listening" : "Start Voice Input"}
</Button>

<TextField
  label="Voice Transcript"
  value={transcript}
  multiline
  rows={3}
  fullWidth
  margin="normal"
/>


        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </Stack>
    </Container>
  );
}

export default App;
