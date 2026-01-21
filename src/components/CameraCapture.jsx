
import { useRef, useState } from "react";
import { IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function CameraCapture({ onCapture }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setError(null);
      setUploading(true);
      try {
        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          if (onCapture) onCapture(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload as blob
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
        // Optionally handle response data here
      } catch (err) {
        setError(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <IconButton color="primary" onClick={handleIconClick} disabled={uploading}>
        <CameraAltIcon />
      </IconButton>
      {image && (
        <img src={image} alt="Captured" style={{ maxWidth: "100%", marginTop: 8 }} />
      )}
      {uploading && <div>Uploading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
