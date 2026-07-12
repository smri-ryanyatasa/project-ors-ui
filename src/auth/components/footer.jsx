import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Footer() {
  return (
    <Box
      sx={{
        mt: 'auto',
        py: 2,
        px: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ color: '#0030ff', fontWeight: 800 }}>
        SM RETAIL
      </Typography>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} 2026 Powered by SM Retail ITSS
      </Typography>
    </Box>
  );
}
