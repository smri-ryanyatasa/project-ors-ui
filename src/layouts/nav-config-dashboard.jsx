import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  params: icon('ic-params'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  subpaths: icon('ic-subpaths'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

// export const navData = [
//   /**
//    * Maine Menu
//    */
//   {
//     subheader: 'Main Menu',
//     items: [
//       {
//         title: 'Dashboard',
//         path: paths.dashboard.root,
//         icon: ICONS.dashboard,
//       },
//       {
//         title: 'MNS Master File',
//         path: paths.dashboard.group.root,
//         icon: ICONS.user,
//         children: [
//           { title: 'Branch', path: paths.dashboard.group.root },
//           { title: 'Item', path: paths.dashboard.group.five },
//         ],
//       },
//       { title: 'Packing List', path: paths.dashboard.two, icon: ICONS.ecommerce },
//       { title: 'PL Receiving', path: paths.dashboard.three, icon: ICONS.analytics },
//       { title: 'PO Logs', path: paths.dashboard.three, icon: ICONS.kanban },
//       {
//         title: 'Reports',
//         path: paths.dashboard.group.root,
//         icon: ICONS.folder,
//         children: [
//           { title: 'PL Ageing Report', path: paths.dashboard.two },
//           { title: 'Receiving Report', path: paths.dashboard.three },
//           { title: 'Discrepancy Report', path: paths.dashboard.three },
//         ],
//       },
//     ],
//   },
//   /**
//    * Management
//    */
//   {
//     subheader: 'Management',
//     items: [
//       {
//         title: 'Maintenance',
//         path: paths.maintenance.root,
//         icon: ICONS.user,
//         children: [
//           { title: 'User Management', path: paths.maintenance.users },
//           { title: 'Role and Permission', path: paths.maintenance.rolePermissions },
//           { title: 'PL Approval Workflow', path: paths.dashboard.group.six },
//         ],
//       },
//       {
//         title: 'Application Setup',
//         path: paths.dashboard.group.root,
//         icon: ICONS.lock,
//         children: [
//           { title: 'Lookup', path: paths.dashboard.group.root },
//           { title: 'Global Config', path: paths.dashboard.group.five },
//         ],
//       },
//     ],
//   },
// ];

// console.log(navData);

// export const mapMenuItemToNav = (menu) => ({
//   title: menu.name,
//   path: `${paths.base}${menu.url}` || `${paths.base}/dashboard`,
//   icon: ICONS[menu.icon],
//   children: menu.children?.length ? menu.children.map(mapMenuItemToNav) : undefined,
// });

// export const getNavData = (menus = []) =>
//   menus.map((menu) => ({
//     subheader: menu.name,
//     items: menu.children?.map(mapMenuItemToNav) || [],
//   }));

export const mapMenuItemToNav = (menu) => ({
  title: menu.name,

  path: menu.url ? `${paths.base}${menu.url}` : `${paths.base}/dashboard`,

  icon: menu.icon ? ICONS[menu.icon] : undefined,

  children: menu.children?.length ? menu.children.map(mapMenuItemToNav) : undefined,
});

// ----------------------------------------------------------------------
// Filter master menus using assigned menu IDs
// ----------------------------------------------------------------------

const filterAssignedMenus = (menus, assignedMenuIds) =>
  menus
    .map((menu) => {
      const filteredChildren = menu.children
        ? filterAssignedMenus(menu.children, assignedMenuIds)
        : [];

      const isAssigned = assignedMenuIds.has(menu.id);

      if (isAssigned || filteredChildren.length > 0) {
        return {
          ...menu,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter(Boolean);

// ----------------------------------------------------------------------
// Create nav data
// ----------------------------------------------------------------------

export const getNavData = (menus = [], assignedMenus = []) => {
  const assignedMenuIds = new Set(assignedMenus.map((menu) => menu.id));

  const filteredMenus = filterAssignedMenus(menus, assignedMenuIds);

  return filteredMenus.map((menu) => ({
    subheader: menu.name,
    items: menu.children?.map(mapMenuItemToNav) || [],
  }));
};
