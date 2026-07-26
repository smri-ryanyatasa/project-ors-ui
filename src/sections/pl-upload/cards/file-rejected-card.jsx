import { Box, Grid, Card, Stack, Typography, CardContent } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function FileRejectedCard() {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',

          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 80,
            height: '100%',
            background: (theme) =>
              `linear-gradient(
                    90deg,
                    ${theme.palette.error.main}20 0%,
                    ${theme.palette.error.main}10 40%,
                    transparent 100%
                )`,
          },
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h4" fontWeight={700}>
                128
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Total List Rejected
              </Typography>
            </Box>

            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'error.lighter',
              }}
            >
              <SvgColor
                src="/assets/icons/solar/lucide--file-x-corner.svg"
                sx={{
                  width: 28,
                  height: 28,
                  color: 'error.main',
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
