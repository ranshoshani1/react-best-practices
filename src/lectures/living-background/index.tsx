import { Box } from "@mui/material";
import "./index.css";

interface BlobProps {
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
}

function Blob({ color, orbitRadius, orbitSpeed }: BlobProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: `linear-gradient(45deg, ${color}, ${color})`,
        filter: "blur(70px)",
        opacity: 0.7,
        animation: `orbit-${orbitRadius} ${orbitSpeed}s linear infinite`,
        transformOrigin: `${orbitRadius}px center`,
        marginTop: "-150px",
        marginLeft: "-150px",
      }}
    />
  );
}

export default function LivingBackground() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Blob color="#2196F3" orbitRadius={200} orbitSpeed={20} />
      <Blob color="#FF4081" orbitRadius={300} orbitSpeed={20} />
    </Box>
  );
}
