import { Ticket } from '@acme/shared-models';
import { Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';

import { useAppSelector } from '../hooks/hooks';
import { usersWithTicketsSelector } from '../store/tickets/tickets.selectors';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  {
    field: 'tickets',
    headerName: 'Ticket Count',
    type: 'number',
    valueGetter: (params: GridValueGetterParams<Ticket[]>) =>
      `${params.value?.length ?? 0}`,
  },
];

export const UsersPage = () => {
  const users = useAppSelector(usersWithTicketsSelector);

  return (
    <Stack spacing={2} sx={{ width: '100%', height: '100%' }}>
      <Typography>
        Check current users & their assigned ticket's count:
      </Typography>

      <Paper sx={{ flex: 1 }}>
        <DataGrid columns={columns} rows={users} />
      </Paper>
    </Stack>
  );
};
