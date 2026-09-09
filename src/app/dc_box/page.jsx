'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f4f6f8',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          minHeight: 0,
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            width: '50%',
            display: {
              xs: 'none',
              md: 'flex',
            },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: '#1238f5',
            color: 'white',
            px: 5,
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.12,

              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  #fff 35px,
                  #fff 55px
                )
              `,
            }}
          />

          {/* Decorative circles */}
          <Box />

          {/* Content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              maxWidth: 500,
            }}
          >
            {/* Illustration placeholder */}
            <Box
              sx={{
                width: 320,
                height: 270,
                mx: 'auto',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <img src="/assets/icons/solar/login-scan.png" alt="Logo" />
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: {
                  md: 28,
                  lg: 32,
                },
                mb: 1.5,
              }}
            >
              Streamlined Box Scanning
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.7,
                fontWeight: 500,
                maxWidth: 450,
                mx: 'auto',
              }}
            >
              Enhance efficiency with faster, more accurate scanning, reducing errors and
              streamlining workflows.
            </Typography>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: {
              xs: 2,
              sm: 4,
            },
            py: 5,
          }}
        >
          <Card
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 385,
              p: {
                xs: 3,
                sm: 4,
              },
              borderRadius: 2,
              boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: 1.5,
                  bgcolor: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src="/assets/icons/solar/dc-box-logo.svg" alt="Logo" />
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="h6"
              textAlign="center"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Welcome to DC Box
            </Typography>

            {/* Username */}
            <TextField
              fullWidth
              placeholder="Username or Email"
              size="small"
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:user-outline" width={18} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              size="small"
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:lock-password-outline" width={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <Iconify icon="solar:eye-outline" width={18} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot Password */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 3,
              }}
            >
              <Typography
                component="a"
                href="#"
                sx={{
                  fontSize: 13,
                  color: '#003cff',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* Login */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              sx={{
                height: 41,
                boxShadow: 'none',
                mb: 2,
              }}
            >
              Login
            </Button>

            {/* Email Login */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              color="primary"
              sx={{
                height: 41,
              }}
            >
              Login with Email link
            </Button>
          </Card>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          height: 58,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: {
            xs: 2,
          },
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: 13,
            color: 'text.primary',
            fontWeight: '600',
          }}
        >
          © 2026 Powered by SM Retail ITSS
        </Typography>
      </Box>
    </Box>
  );
}
