import { Box, Card, Stack, Skeleton, Typography, CardContent } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function FileUploadedCard(props) {
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
                      ${theme.palette.success.main}20 0%,
                      ${theme.palette.success.main}10 40%,
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
              width: 45,
              height: 45,
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
  );
}
