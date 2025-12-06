import { Box, Typography, Paper } from "@mui/material";

export default function ResponseDisplay({ result }) {
  if (!result) return null;

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6">Transcription Result</Typography>
      <Typography sx={{ mt: 1 }}>{result.text}</Typography>
    </Paper>
  );
}
