import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export function AuthSplitSection({
  sx,
  method,
  methods,
  layoutQuery = 'md',
  title = 'Manage the job',
  imgUrl = `${CONFIG.assetsDir}/assets/illustrations/illustration-dashboard.webp`,
  subtitle = 'Ordering and Receiving System is a centralized platform for managing orders, receiving deliveries, and maintaining accurate inventory across stores and warehouses.',
  ...other
}) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [`url(${CONFIG.assetsDir}/assets/background/login-background.svg)`],
          }),
          px: 3,
          pb: 3,
          width: 1,
          maxWidth: 750,
          display: 'none',
          position: 'relative',
          pt: 'var(--layout-header-desktop-height)',
          [theme.breakpoints.up(layoutQuery)]: {
            gap: 4,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <div>
        <Typography variant="h3" sx={{ textAlign: 'center', color: '#ffffff' }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{ textAlign: 'center', mt: 1, color: '#ffffff', maxWidth: 500, fontSize: '15px' }}
          >
            {subtitle}
          </Typography>
        )}
      </div>

      <Box
        component="img"
        alt="Dashboard illustration"
        src={imgUrl}
        sx={{ width: 370, aspectRatio: '4/3', objectFit: 'cover' }}
      />
    </Box>
  );
}
