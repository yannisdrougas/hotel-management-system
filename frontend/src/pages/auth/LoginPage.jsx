import { Link, useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {

    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {

        setError("Please fill in all fields.");
        return;

    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        setError("Please enter a valid email address.");
        return;

    }

    if (password.length < 6) {

        setError(
            "Password must contain at least 6 characters."
        );

        return;

    }

    navigate("/");

};

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                p: 2
            }}
        >

            <Card
                elevation={6}
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    borderRadius: 3
                }}
            >

                <CardContent
                    sx={{
                        p: 4
                    }}
                >

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        sx={{
                            mb: 1
                        }}
                    >
                        Hotel Management System
                    </Typography>


                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="text.secondary"
                        sx={{
                            mb: 4
                        }}
                    >
                        Welcome Back
                    </Typography>


                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        {error && (

                        <Alert
                         severity="error"
                          sx={{
                         mb: 2
                             }}
                        >
                         {error}
                         </Alert>

                            )}

                        <TextField
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            sx={{
                                mb: 3
                            }}
                        />


                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            sx={{
                                mb: 3
                            }}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.4
                            }}
                        >
                            Login
                        </Button>


                        <Typography
    textAlign="center"
    color="text.secondary"
    sx={{
        mt: 3
    }}
>
    Don't have an account?{" "}

    <Link
        to="/signup"
        style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold"
        }}
    >
        Sign Up
    </Link>

</Typography>
                    </Box>

                </CardContent>

            </Card>

        </Box>

    );

}

export default LoginPage;