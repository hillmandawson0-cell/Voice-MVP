

import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";





export default function MainForm({ onSubmit }) {
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ product, location, event });
setProduct("");
setLocation("");
setEvent("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <TextField
        label="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        fullWidth
        margin="normal"
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
    </Box>
  );
}


