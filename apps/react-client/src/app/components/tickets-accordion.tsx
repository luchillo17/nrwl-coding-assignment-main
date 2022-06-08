import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { TicketWithUser } from '../store/tickets/tickets';
import { TicketCard } from './tickets-card';

export interface TicketsAccordionProps {
  title: ReactNode;
  tickets: TicketWithUser[];
}

export const TicketsAccordion: FC<TicketsAccordionProps> = ({
  title,
  tickets,
}) => {
  const theme = useTheme();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>

        <Chip label={tickets.length} color="primary" />
      </AccordionSummary>

      <AccordionDetails sx={{ backgroundColor: theme.palette.grey[50] }}>
        <Stack spacing={2}>
          {tickets &&
            tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket}></TicketCard>
            ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
