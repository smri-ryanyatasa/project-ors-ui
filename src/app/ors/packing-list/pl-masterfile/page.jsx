import { CONFIG } from 'src/global-config';

import { PlMasterfileListView } from 'src/sections/pl-masterfile/view/pl-masterfile-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Packing List | PL Masterfile - ${CONFIG.appName}` };

export default function Page() {
  return <PlMasterfileListView title="PL Masterfile" />;
}
