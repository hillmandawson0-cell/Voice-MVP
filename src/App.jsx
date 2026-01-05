/*
UI
Form state
Button clicks
Voice transcription state
Calling API functions
*/

import { useState } from "react";
import { Container, Stack, Button } from "@mui/material";
import { sendEvent } from "./components/hooks/api/transcribe.js";
import { useSpeechRecognition } from "./components/hooks/useSpeechRecognition";
import MainForm from "./components/MainForm"; // Ensure MainForm is imported


function App() {
  const [productName, setProductName] = useState("");
  const [zone, setZone] = useState("");
  const [event, setEvent] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(""); // State to manage the message
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

const {
  isListening,
  startListening,
  stopListening,
} = useSpeechRecognition({
  onResult: (text) => {
    setProductName(text); // Update the Product Name field with the transcription
  }
});
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

  

  async function handleSubmit({ product, location, event }) { // Update to accept form data
    let transcript = "";
    try {
      const data = await sendEvent({
        product,
        zone: location,
        event,
        transcript,
        setMessage, // Pass setMessage to sendEvent
      });

      setResult(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={2}>
        <MainForm
          onSubmit={handleSubmit}
          message={message}
          productName={productName} // Pass productName to MainForm
          setProductName={setProductName} // Pass setProductName to MainForm
          isListening={isListening} // Pass isListening to MainForm
          startListening={startListening} // Pass startListening to MainForm
          stopListening={stopListening} // Pass stopListening to MainForm
        />
      </Stack>
    </Container>
    
  );

  
  
}

export default App;
