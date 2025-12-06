

import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";





export default function MainForm({ onSubmit }) {
  const [product, setProduct] = useState("");
  const [zone, setZone] = useState("");
  const [event, setEvent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ product, zone, event });
setProduct("");
setZone("");
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
        label="Zone"
        value={zone}
        onChange={(e) => setZone(e.target.value)}
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


