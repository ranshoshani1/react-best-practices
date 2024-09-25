import TableContainer from '@elementor/ui/TableContainer';
import Table from '@elementor/ui/Table';
import { useWebsite } from '../../../../providers/website-provider';
import FieldWithLoading from './field-with-loading';
import StatusChip from './status-chip';
import Link from '@elementor/ui/Link';
import TableCell from '@elementor/ui/TableCell';
import FailedRowActions from './failed-row-actions';
import Actions from './actions';
import TableHead from '@elementor/ui/TableHead';
import TableRow from '@elementor/ui/TableRow';

const fields = [
  {
    id: 'url',
    label: 'Staging url',
    component: ({ stagingSite }) => (
      <FieldWithLoading
        value={
          <Link
            color="text.primary"
            underline="hover"
            href={stagingSite.url}
            target="_blank"
          >
            {stagingSite.url}
          </Link>
        }
        site={stagingSite}
      />
    ),
  },
  {
    id: 'created_at',
    label: 'Date created',
    component: ({ stagingSite }) => {
      const createdAt = formatDate(stagingSite.date_created);
      return <FieldWithLoading value={createdAt} site={stagingSite} />;
    },
  },
  {
    id: 'last_push',
    label: 'Last pulled',
    component: ({ stagingSite }) => {
      const lastPush = formatDate(stagingSite.push?.last_completion_at);
      return <FieldWithLoading value={lastPush} site={stagingSite} />;
    },
  },
  {
    id: 'last_pull',
    label: 'Last pushed',
    component: ({ stagingSite }) => {
      const lastPull = formatDate(stagingSite.pull?.last_completion_at);
      return <FieldWithLoading value={lastPull} site={stagingSite} />;
    },
  },
  {
    id: 'status',
    label: 'Status',
    component: StatusChip,
  },
  {
    id: 'actions',
    label: '',
    cellProps: { align: 'right' },
    component: ({ stagingSite }) => {
      if (stagingSite.status === 'Pending') {
        return null;
      }

      if (stagingSite.status === 'Failed') {
        return <FailedRowActions />;
      }

      return <Actions stagingSite={stagingSite} />;
    },
  },
];

function Header() {
  return (
    <TableHead>
      <TableRow>
        {fields.map((field) => {
          return (
            <TableCell key={field.id} sx={{ whiteSpace: 'nowrap' }}>
              {field.label}
            </TableCell>
          );
        })}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

function Row() {
  const { staging } = useWebsite();
  const stagingSite = staging?.config;

  return (
    <TableRow disableDivider>
      {fields.map((field) => {
        const Component = field.component;
        return (
          <TableCell key={field.id} {...field.cellProps}>
            <Component stagingSite={stagingSite} />
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default function StagingTable() {
  return (
    <TableContainer>
      <Table>
        <Header />
        <Row />
      </Table>
    </TableContainer>
  );
}
