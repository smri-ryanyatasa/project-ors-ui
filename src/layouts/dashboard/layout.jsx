'use client';

import { useMemo } from 'react';
import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { iconButtonClasses } from '@mui/material/IconButton';

import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';

import { usePOLogs } from 'src/sections/po-logs/hooks/use-po-logs';
import { useRolePermissions } from 'src/sections/role-permissions/hooks/use-roles';
import {
  PlUploadProvider,
  usePlUploadContext,
} from 'src/sections/pl-upload/view/pl-upload-context';

import { useMockedUser } from 'src/auth/hooks';

import { NavMobile } from './nav-mobile';
import { VerticalDivider } from './content';
import { NavVertical } from './nav-vertical';
import { NavHorizontal } from './nav-horizontal';
import { _account } from '../nav-config-account';
import { getNavData } from '../nav-config-dashboard';
import { _workspaces } from '../nav-config-workspace';
import { MenuButton } from '../components/menu-button';
import { AccountDrawer } from '../components/account-drawer';
import { SettingsButton } from '../components/settings-button';
import { WorkspacesPopover } from '../components/workspaces-popover';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';
import { MainSection, layoutClasses, HeaderSection, LayoutSection } from '../core';

// ----------------------------------------------------------------------

export function DashboardLayout(props) {
  return (
    <PlUploadProvider>
      <DashboardLayoutContent {...props} />
    </PlUploadProvider>
  );
}

// ----------------------------------------------------------------------

function DashboardLayoutContent({ sx, cssVars, children, slotProps, layoutQuery = 'lg' }) {
  const theme = useTheme();

  // ✅ NOW this is inside PlUploadProvider
  const { loading, plsUplaodStatus } = usePlUploadContext();
  const { status: poLogsStatus } = usePOLogs();

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const { menus } = useRolePermissions();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const parsedMenus = useMemo(() => {
    if (!user?.menus) {
      return [];
    }

    try {
      return JSON.parse(user.menus) ?? [];
    } catch (error) {
      console.error('Invalid menus JSON:', error);

      return [];
    }
  }, [user?.menus]);

  // ----------------------------------------------------------------------

  const navData = useMemo(
    () => getNavData(menus, parsedMenus, plsUplaodStatus, loading, poLogsStatus),
    [menus, parsedMenus, plsUplaodStatus, loading, poLogsStatus]
  );

  // ----------------------------------------------------------------------

  const isNavMini = settings.state.navLayout === 'mini';

  const isNavHorizontal = settings.state.navLayout === 'horizontal';

  const isNavVertical = isNavMini || settings.state.navLayout === 'vertical';

  const canDisplayItemByRole = (allowedRoles) => !allowedRoles?.includes(user?.role);

  // ----------------------------------------------------------------------

  const renderHeader = () => {
    const headerSlotProps = {
      container: {
        maxWidth: false,
        sx: {
          ...(isNavVertical && {
            px: { [layoutQuery]: 5 },
          }),

          ...(isNavHorizontal && {
            bgcolor: 'var(--layout-nav-bg)',

            height: {
              [layoutQuery]: 'var(--layout-nav-horizontal-height)',
            },

            [`& .${iconButtonClasses.root}`]: {
              color: 'var(--layout-nav-text-secondary-color)',
            },
          }),
        },
      },
    };

    const headerSlots = {
      topArea: (
        <Alert
          severity="info"
          sx={{
            display: 'none',
            borderRadius: 0,
          }}
        >
          This is an info Alert.
        </Alert>
      ),

      bottomArea: isNavHorizontal ? (
        <NavHorizontal
          data={navData}
          layoutQuery={layoutQuery}
          cssVars={navVars.section}
          checkPermissions={canDisplayItemByRole}
        />
      ) : null,

      leftArea: (
        <>
          <MenuButton
            onClick={onOpen}
            sx={{
              mr: 1,
              ml: -1,

              [theme.breakpoints.up(layoutQuery)]: {
                display: 'none',
              },
            }}
          />

          <NavMobile
            data={navData}
            open={open}
            onClose={onClose}
            cssVars={navVars.section}
            checkPermissions={canDisplayItemByRole}
          />

          {isNavHorizontal && (
            <Logo
              sx={{
                display: 'none',

                [theme.breakpoints.up(layoutQuery)]: {
                  display: 'inline-flex',
                },
              }}
            />
          )}

          {isNavHorizontal && (
            <VerticalDivider
              sx={{
                [theme.breakpoints.up(layoutQuery)]: {
                  display: 'flex',
                },
              }}
            />
          )}

          <WorkspacesPopover
            data={_workspaces}
            sx={{
              ...(isNavHorizontal && {
                color: 'var(--layout-nav-text-primary-color)',
              }),
            }}
          />
        </>
      ),

      rightArea: (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0, sm: 0.75 },
          }}
        >
          <SettingsButton />

          <AccountDrawer data={_account} />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation={isNavVertical}
        {...slotProps?.header}
        slots={{
          ...headerSlots,
          ...slotProps?.header?.slots,
        }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  // ----------------------------------------------------------------------

  const renderSidebar = () => (
    <NavVertical
      data={navData}
      isNavMini={isNavMini}
      layoutQuery={layoutQuery}
      cssVars={navVars.section}
      checkPermissions={canDisplayItemByRole}
      onToggleNav={() =>
        settings.setField(
          'navLayout',
          settings.state.navLayout === 'vertical' ? 'mini' : 'vertical'
        )
      }
    />
  );

  const renderFooter = () => null;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      headerSection={renderHeader()}
      sidebarSection={isNavHorizontal ? null : renderSidebar()}
      footerSection={renderFooter()}
      cssVars={{
        ...dashboardLayoutVars(theme),
        ...navVars.layout,
        ...cssVars,
      }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',

              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',

                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}
