import { useState } from "react";
import { TextField, Button, Box, Alert, Stack, InputAdornment, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

export default function MainForm({ onSubmit, message, productName, setProductName, isListening, startListening, stopListening }) {
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ product: productName, location, event });
    setProductName("");
    setLocation("");
    setEvent("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
    >
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={isListening ? stopListening : startListening}
                color={isListening ? "error" : "default"}
              >
                {isListening ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Event"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit
      </Button>

      {message && ( // Display the message if it exists
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
}