import { CONFIG } from 'src/global-config';

import { BranchListView } from 'src/sections/branch/view/branch-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `MMS Masterfile | Branch - ${CONFIG.appName}` };

export default function Page() {
  return <BranchListView title="Branch Masterfile" />;
}
