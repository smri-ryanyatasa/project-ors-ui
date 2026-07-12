import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export function PageHeader({ title, breadcrumbs = [], action }) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        pl: 5,
        pr: 5,
        borderRadius: 0,
        boxShadow: 'none',
        borderBottom: '1px solid #ebebeb',
        borderTop: '1px solid #ebebeb',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ color: '#0030ff' }}>
            {title}
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((item, index) =>
              item.href ? (
                <Link key={index} href={item.href} underline="hover" color="inherit">
                  {item.label}
                </Link>
              ) : (
                <Typography key={index}>{item.label}</Typography>
              )
            )}
          </Breadcrumbs>
        </Stack>

        {action}
      </Stack>
    </Card>
  );
}
