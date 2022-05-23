import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { TicketWithUser } from '../store/tickets/tickets';

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
      </AccordionSummary>

      <AccordionDetails sx={{ backgroundColor: theme.palette.grey[50] }}>
        <Stack spacing={2}>
          {tickets &&
            tickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent>
                  <Typography>Ticket ID: {ticket.id}</Typography>

                  <Typography>Description: {ticket.description}</Typography>

                  <Typography>
                    Status: {ticket.completed ? 'Completed' : 'Pending'}
                  </Typography>

                  <Typography>
                    Assignee: {ticket.user?.name ?? 'Not assigned'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
