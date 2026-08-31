import { Box, Grid, Card, Stack, Skeleton, Typography, CardContent } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function SummaryCard(props) {
  const { total_uq_pls, total_uq_skus, total_pl_qty, total_pl_initial_qty, total_pl_final_qty } =
    props.summary[0] ?? 0;

  const summaryCards = [
    {
      value: total_uq_pls,
      label: 'Total Unique PLs',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'primary',
    },
    {
      value: total_uq_skus,
      label: 'Total Unique SKUs',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'primary',
    },
    {
      value: total_pl_qty,
      label: 'Total PL Quantity',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'primary',
    },
    {
      value: total_pl_initial_qty,
      label: 'Total Initial Received Quantity',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'primary',
    },
    {
      value: total_pl_final_qty,
      label: 'Total Final Received Quantity',
      icon: '/assets/icons/solar/lucide--file-check-corner.svg',
      color: 'primary',
    },
  ];
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {summaryCards.map((card) => (
        <Grid key={card.label} size={{ xs: 12, sm: 6, md: 2.4 }} sx={{ display: 'flex' }}>
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
