import React from "react";
import { Button, Typography } from "@mui/material";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";

export default function TestSpeechRecognition() {
  const [transcription, setTranscription] = React.useState("");
  const { isListening, startListening, stopListening } = useSpeechRecognition({
    onResult: (text) => setTranscription(text),
  });

  return (
    <div>
      <Typography variant="h6">Speech Recognition Test</Typography>
      <Button
        variant="contained"
        color={isListening ? "error" : "primary"}
        onClick={isListening ? stopListening : startListening}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </Button>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Transcription: {transcription}
      </Typography>
    </div>
  );
}
