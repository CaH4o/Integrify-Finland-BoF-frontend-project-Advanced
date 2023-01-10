import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(function () {
    const redirect = setTimeout(function () {
      navigate("./products");
    }, 3000);

    return () => {
      clearTimeout(redirect);
    };
  },);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      bgcolor="#121212"
      color="text.secondary"
    >
      <Typography variant="h2" margin="3rem">
        Front-end Project Advanced
      </Typography>
      <Typography variant="body1" fontSize="2rem">
        You will redirect on Products in 3 seconds
      </Typography>
      <Typography variant="body2" fontSize="2rem">
        by Oleksandr Tertyshnyk
      </Typography>
    </Box>
  );
}
