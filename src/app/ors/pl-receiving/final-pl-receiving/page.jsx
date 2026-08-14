import { CONFIG } from 'src/global-config';

import { FinalPlReceivingListView } from 'src/sections/final-pl-receiving/view/final-pl-receiving-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `PL Receiving | Final PL Receiving - ${CONFIG.appName}` };

export default function Page() {
  return <FinalPlReceivingListView title="PL Receiving" />;
}
