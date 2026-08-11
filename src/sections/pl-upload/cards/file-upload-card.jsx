import { Box, Grid, Card, Stack, Skeleton, Typography, CardContent } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function FileUploadedCard(props) {
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
            width: '100%',
            height: '100%',
            background: (theme) =>
              `linear-gradient(
                      90deg,
                      ${theme.palette.success.main}20 0%,
                      ${theme.palette.success.main}10 40%,
                      transparent 100%
                  )`,
          },
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              {props.loading ? (
                <Skeleton variant="text" width={60} height={40} />
              ) : (
                <Typography variant="h4" fontWeight={700}>
                  {props?.uploaded}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary">
                Total PLs in Available Status
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
                bgcolor: 'success.lighter',
              }}
            >
              <SvgColor
                src="/assets/icons/solar/lucide--file-check-corner.svg"
                sx={{
                  width: 28,
                  height: 28,
                  color: 'success.main',
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
