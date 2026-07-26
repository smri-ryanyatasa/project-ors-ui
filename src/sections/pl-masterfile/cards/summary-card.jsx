import { Box, Grid, Card, Stack, Typography, CardContent } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function SummaryCard() {
  const summaryCards = [
    {
      value: 128,
      label: 'Total Pls',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'error',
    },
    {
      value: 256,
      label: 'Total Pls in Uploaded Status',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'success',
    },
    {
      value: 84,
      label: 'Total Pls in Available Status',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'warning',
    },
    {
      value: 1024,
      label: 'Total Pls in Initial Receipt Status',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'info',
    },
    {
      value: 32,
      label: 'Total Pls in Approved Receipt Status',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'error',
    },
    {
      value: 1440,
      label: 'Total Pls in PO Generated Status',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'primary',
    },
  ];
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {summaryCards.map((card) => (
        <Grid key={card.label} size={{ xs: 12, sm: 6, md: 2 }} sx={{ display: 'flex' }}>
          <Card
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
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
                    ${theme.palette[card.color].main}10 0%,
                    ${theme.palette[card.color].main}10 20%,
                    transparent 100%
                )`,
              },
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                {/* Number + Text */}
                <Box
                  sx={{
                    minHeight: 70,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h4" fontWeight={700}>
                    {card.value}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {card.label}
                  </Typography>
                </Box>

                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${card.color}.lighter`,
                    flexShrink: 0,
                  }}
                >
                  <SvgColor
                    src={card.icon}
                    sx={{
                      width: 28,
                      height: 28,
                      color: `${card.color}.main`,
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
