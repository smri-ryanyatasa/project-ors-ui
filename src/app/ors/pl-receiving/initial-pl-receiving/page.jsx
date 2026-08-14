import { CONFIG } from 'src/global-config';

import { InitialPlReceivingListView } from 'src/sections/initial-pl-receiving/view/initial-pl-receiving-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `PL Receiving | Initial PL Receiving - ${CONFIG.appName}` };

export default function Page() {
  return <InitialPlReceivingListView title="PL Receiving" />;
}
