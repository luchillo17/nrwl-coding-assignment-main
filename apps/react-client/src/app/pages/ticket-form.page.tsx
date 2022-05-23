import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router';
import * as yup from 'yup';

import { TicketCard } from '../components/tickets-card';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { addTicket, TicketWithUser } from '../store/tickets/tickets';
import { ticketsSelector } from '../store/tickets/tickets.selectors';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  description: yup
    .string()
    .trim()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters'),
});

export const TicketFormPage = () => {
  // Routing & params
  const navigate = useNavigate();
  const idStr = useMatch('/tickets/:id')?.params.id;

  // #region Redux ticket logic
  const dispatch = useAppDispatch();

  const id = useMemo(() => {
    const _id = parseInt(idStr ?? '-1');

    return Number.isInteger(_id) ? _id : -1;
  }, [idStr]);

  const tickets = useAppSelector(ticketsSelector);

  const ticket = useMemo<TicketWithUser>(() => {
    const newTicket: TicketWithUser = {
      id: -1,
      description: '',
      completed: false,
      assigneeId: null,
    };

    if (id < 0) {
      return newTicket;
    }

    const _ticket = tickets.find((ticket) => ticket.id === +id);

    return _ticket ?? newTicket;
  }, [id, tickets]);

  // New if id is < 0 or ticket was not found
  const isNew = useMemo(() => ticket.id < 0, [ticket]);
  // #endregion

  const formik = useFormik({
    initialValues: {
      ...ticket,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: TicketWithUser) => {
      try {
        const response = await fetch('/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const createdTicket: TicketWithUser = await response.json();

        if (createdTicket) {
          dispatch(addTicket(createdTicket));
          navigate(`/tickets/${createdTicket.id}`);
        }
      } catch (error) {}
    },
  });

  return (
    <Card>
      <CardContent>
        {isNew ? (
          <Stack component="form" onSubmit={formik.handleSubmit} spacing={2}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              required
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Stack>
        ) : (
          <TicketCard ticket={ticket} />
        )}
      </CardContent>
    </Card>
  );
};
