import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { Appointments } from '../Appointments';
import { AppointmentList } from '../AppointmentList';
import '@testing-library/jest-dom/extend-expect';

describe('Appointments List Unit Testing', () => {

    describe('AppointmentList', () => {
        let appointment;
        const list = [{
            id: '123456789',
            description: 'test appointment',
            date: '01/01/2023',
            time: '12:00pm',
            location: 'Seattle',
          }];

        beforeAll(() => {
            appointment = render(<AppointmentList appointments={list} />)
        });

        test('Renders Edit and Delete Buttons', async () => {
            const buttons =  await screen.findAllByRole('button');
            expect(buttons.length).toBe(2);
            expect(buttons[0]).toHaveClass('edit-btn');
            expect(buttons[1]).toHaveClass('delete-btn');
          });

        test('Renders Appointment to Appointmentlist Table', async () => {
            const table = await screen.getByTestId('appointment-row');
            const description = await screen.getByRole('cell', {
                name: /test appointment/i
              });
            const date = await screen.getByRole('cell', {
                name: /01\/01\/2023/i
              });
            const time = await screen.getByRole('cell', {
                name: /12:30pm/i
              });
            const location = await screen.getByRole('cell', {
                name: /seattle/i
              })
            expect(table).toHaveTextContent('/test description 01\/01\/2023 12:00pm Seattle/i');
            expect(description).toBeInTheDocument();
            expect(date).toBeInTheDocument();
            expect(time).toBeInTheDocument();
            expect(location).toBeInTheDocument();            
        })         
    })
});



// Note: Tests are incomplete. I understand the importance of testing and would have liked to finish them
// and write more complete unit/integration tests, but unforunately ran out of time

