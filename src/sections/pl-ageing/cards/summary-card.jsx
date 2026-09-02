import { Box, Grid, Card, Stack, Skeleton, Typography, CardContent } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function SummaryCard(props) {
  const {
    longest_aging_approve_po_gen,
    longest_aging_available_initial,
    longest_aging_initial_approve,
    longest_aging_upload_available,
  } = props.summary[0] ?? 0;

  const summaryCards = [
    {
      value: longest_aging_upload_available,
      label: 'Longest Aging (Days) from Uploaded to Available',
      icon: '/assets/icons/solar/lucide--clock-arrow-up.svg',
      color: 'primary',
    },
    {
      value: longest_aging_available_initial,
      label: 'Longest Aging (Days) from Available to Initial Report',
      icon: '/assets/icons/solar/lucide--clock-3.svg',
      color: 'primary',
    },
    {
      value: longest_aging_initial_approve,
      label: 'Longest Aging (Days) from Initial Receipt to Approved',
      icon: '/assets/icons/solar/lucide--clock-check.svg',
      color: 'primary',
    },
    {
      value: longest_aging_approve_po_gen,
      label: 'Longest Aging (Days) from Approved Rept. to PO Gen.',
      icon: '/assets/icons/solar/lucide--calendar-clock.svg',
      color: 'primary',
    },
  ];
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {summaryCards.map((card) => (
        <Grid key={card.label} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
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
                width: '100%',
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
                  {props.loading ? (
                    <Skeleton variant="text" width={60} height={40} />
                  ) : (
                    <Typography variant="h4" fontWeight={700}>
                      {card.value}
                    </Typography>
                  )}

                  <Typography variant="body2" color="text.secondary">
                    {card.label}
                  </Typography>
                </Box>

                {/* Icon */}
                <Box
                  sx={{
                    width: 45,
                    height: 45,
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
