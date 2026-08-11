import { Box, Grid, Card, Stack, Skeleton, Typography, CardContent } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function FileRejectedCard(props) {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        flex: 1,

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
                      ${theme.palette.error.main}20 0%,
                      ${theme.palette.error.main}10 40%,
                      transparent 100%
                  )`,
        },
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          {/* Text */}
          <Box>
            {props.loading ? (
              <Skeleton variant="text" width={60} height={40} />
            ) : (
              <Typography variant="h4" fontWeight={700}>
                {props?.reject}
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary">
              Total PLs with errors
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
  );
}
