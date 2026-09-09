'use client';

import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import { PieChart, LineChart } from '@mui/x-charts';
import { Box, Card, Grid, Stack, Button, Typography, CardHeader, CardContent } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import { useAuthContext } from 'src/auth/hooks';

export function DashboardListView({ props, title = 'Blank', sx }) {
  const { user } = useAuthContext();

  const themeColor = useTheme();

  const summaryCards = [
    {
      value: 1,
      label: 'Total Pls',
      icon: '/assets/icons/solar/Sparkline.svg',
      color: 'primary',
    },
    {
      value: 2,
      label: 'Total Pls in Uploaded Status',
      icon: '/assets/icons/solar/Sparkline.svg',
      color: 'error',
    },
    {
      value: 5,
      label: 'Total Pls in Approved Receipt Status',
      icon: '/assets/icons/solar/Sparkline.svg',
      color: 'info', // Purple
    },
    {
      value: 6,
      label: 'Total Pls in PO Generated Status',
      icon: '/assets/icons/solar/Sparkline.svg',
      color: 'success',
    },
  ];

  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 2,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              minHeight: 280,
              display: 'flex',
              alignItems: 'center',
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
            }}
          >
            {/* Decorative gradient */}
            <Box
              sx={{
                position: 'absolute',
                width: 300,
                height: 300,
                right: -130,
                top: -150,
                borderRadius: '50%',
                background: (theme) =>
                  `radial-gradient(
                  circle,
                  ${theme.palette.primary.main}18 0%,
                  transparent 70%
                )`,
              }}
            />

            {/* Content */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                width: { xs: '100%', md: '65%' },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  letterSpacing: '-0.4px',
                }}
              >
                Welcome back 👋 {user?.full_name || 'Admin'}!
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  maxWidth: 600,
                  lineHeight: 1.7,
                  mb: 3,
                  fontSize: 15,
                }}
              >
                Your centralized workspace for managing orders, <br />
                receiving, approvals, and <br />
                purchase orders.
              </Typography>

              <Button
                variant="contained"
                startIcon={<Iconify icon="solar:box-minimalistic-bold-duotone" />}
                color="primary"
                component={Link}
                href="/ors/packing-list/pl-upload"
              >
                Get Started
              </Button>
            </Box>

            {/* Right Illustration */}
            <Box
              sx={{
                position: 'absolute',
                right: { md: 25, lg: 10 },
                top: '50%',
                transform: 'translateY(-50%)',
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Soft glow */}
              <Box
                sx={{
                  position: 'absolute',
                  borderRadius: '50%',
                  background: (theme) =>
                    `radial-gradient(
                    circle,
                    ${theme.palette.primary.main}20 0%,
                    ${theme.palette.primary.main}08 45%,
                    transparent 72%
                  )`,
                }}
              />

              <Box
                component="img"
                alt="Dashboard illustration"
                src={`${CONFIG.assetsDir}/assets/illustrations/Image_Dashbaord.png`}
                sx={{
                  width: '20rem',
                }}
              />
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              minHeight: 280,
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 0.5,
                fontWeight: 700,
              }}
            >
              Ordering Workflow
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Follow the progress of your transactions
            </Typography>

            <Box>
              {[
                {
                  title: 'Upload Packing List',
                  description: 'Upload list of packing',
                  icon: 'solar:cart-large-2-bold-duotone',
                  color: 'primary',
                },
                {
                  title: 'Receiving',
                  description: 'Record received items',
                  icon: 'solar:inbox-in-bold-duotone',
                  color: 'info',
                },
                {
                  title: 'Approval',
                  description: 'Review received items',
                  icon: 'solar:check-circle-bold-duotone',
                  color: 'success',
                },
                {
                  title: 'Purchase Order',
                  description: 'Generate purchase orders',
                  icon: 'solar:document-add-bold-duotone',
                  color: 'warning',
                },
              ].map((item, index, items) => (
                <Box
                  key={item.title}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    pb: index !== items.length - 1 ? 2.5 : 0,
                  }}
                >
                  {/* Connecting line */}
                  {index !== items.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 19,
                        top: 42,
                        height: 28,
                        borderLeft: (theme) => `2px dashed ${theme.palette.divider}`,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      mr: 1.5,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: (theme) => `${theme.palette[item.color].main}14`,
                      color: `${item.color}.main`,
                    }}
                  >
                    <Iconify icon={item.icon} width={22} />
                  </Box>

                  {/* Text */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* Left Content */}
                  <Box
                    sx={{
                      minHeight: 110,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Label - Top */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {card.label}
                    </Typography>

                    {/* Value - Middle */}
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {card.value}
                    </Typography>

                    {/* Trend - Bottom */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <SvgColor
                        src="/assets/icons/solar/ic-solar_double-alt-arrow-up-bold-duotone.svg"
                        width={14}
                        sx={{
                          color: 'success.main',
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: 'success.main',
                        }}
                      >
                        +7.5%
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        in the last 7 days
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Icon - Right */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
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
                        width: 30,
                        height: 30,
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

      <Grid container spacing={2} alignItems="stretch">
        <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ display: 'flex' }}>
          <Card
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader title="Overall Count" subheader="Overview of overall count" />

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: { xs: 1, sm: 2, md: 3 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 300,
                  height: 300,
                }}
              >
                {' '}
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 120,
                          label: 'Success',
                          color: '#22C55E',
                        },
                        {
                          id: 1,
                          value: 80,
                          label: 'Warning',
                          color: '#FFAB00',
                        },
                        {
                          id: 2,
                          value: 50,
                          label: 'Info',
                          color: '#00B8D9',
                        },
                      ],
                      innerRadius: 60,
                      outerRadius: 100,
                    },
                  ]}
                  height={300}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '49%',
                    left: '37%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <Typography color="text.secondary" sx={{ fontSize: 10 }}>
                    Total
                  </Typography>
                  <Typography variant="h4">180</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 8 }} sx={{ display: 'flex' }}>
          <Card
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader title="Processing Overview" subheader="Monthly status count" />

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: { xs: 1, sm: 2, md: 3 },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LineChart
                height={350}
                series={[
                  {
                    data: [8, 23, 15, 25, 44, 55],
                    label: 'PO Generated',
                    color: themeColor.palette.success.main,
                  },
                  {
                    data: [4, 56, 50, 11, 12, 40],
                    label: 'Failed',
                    color: themeColor.palette.warning.main,
                  },
                  {
                    data: [40, 32, 65, 40, 23, 80],
                    label: 'Approved',
                    color: themeColor.palette.info.main,
                  },
                ]}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                  },
                ]}
                grid={{
                  horizontal: true,
                }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      {/* {renderPageHeader()} */}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
    </>
  );
}
