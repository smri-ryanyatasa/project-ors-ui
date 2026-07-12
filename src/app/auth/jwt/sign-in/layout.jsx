import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { GuestGuard } from 'src/auth/guard';
import { Footer } from 'src/auth/components/footer';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: { title: 'Ordering and Receiving System' },
        }}
      >
        <Card sx={{ p: 1 }}>
          <CardContent>{children}</CardContent>
        </Card>
      </AuthSplitLayout>
      <Footer />
    </GuestGuard>
  );
}
