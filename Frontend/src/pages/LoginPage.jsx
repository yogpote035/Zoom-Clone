import * as React from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Mail from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";
export default function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(formData.email, formData.password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.palette.background.default}
      sx={{
        backgroundImage: 'url("/image3.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <h2 style={{ marginBottom: 0, textAlign: "center" }}>Login</h2>

            {error && (
              <div style={{ color: "red", textAlign: "center" }}>{error}</div>
            )}

            <TextField
              label="Email"
              name="email"
              type="email"
              size="small"
              required
              fullWidth
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail fontSize="inherit" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel size="small" htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                size="small"
                required
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              type="submit"
              variant="outlined"
              color="info"
              size="small"
              disableElevation
              fullWidth
            >
              Login Now
            </Button>

            <Stack direction="row" justifyContent="space-between">
              <Button
                onClick={() => navigate("/signup")}
                variant="text"
                size="small"
              >
                Sign Up
              </Button>
              <Button onClick={() => navigate("/")} variant="text" size="small">
                Home
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
