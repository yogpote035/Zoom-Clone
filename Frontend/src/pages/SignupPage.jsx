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
import AccountCircle from "@mui/icons-material/AccountCircle";
import Mail from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext"; // ✅ Use the custom hook

export default function SignupPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleRegister } = useAuth(); // ✅ Get function from context

  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

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

    try {
      await handleRegister(formData.name, formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };
 add <div className=""></div>
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.palette.background.default}
      sx={{
        backgroundImage: 'url("/image5.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <h2 style={{ marginBottom: 0, textAlign: "center" }}>Sign Up</h2>

            {error && (
              <div style={{ color: "red", fontSize: "0.875rem", textAlign: "center" }}>
                {error}
              </div>
            )}

            <TextField
              label="Name"
              name="name"
              type="text"
              size="small"
              required
              fullWidth
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="inherit" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

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
              <InputLabel size="small" htmlFor="password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
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
              Sign Up
            </Button>

            <Stack direction="row" justifyContent="space-between">
              <Button
                onClick={() => navigate("/login")}
                variant="text"
                size="small"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="text"
                size="small"
              >
                Home
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
