import { fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import React from 'react';
import { Appointments } from "./Appointments";
import user from '@testing-library/user-event';
import userEvent from "@testing-library/user-event";

// describe('Appointment Form', () => {
//     const onSubmit = jest.fn();

//     beforeEach(() => {
//         onSubmit.mockClear();
//         render(<Appointments onSubmit={onSubmit} />)
//     })
//      it('An appointment should be submitted', async () => {
//         //  const description = screen.getByPlaceholderText(/description/i);
//         //  fireEvent.change(description, {target: {value: 'testing'}})
//         user.type(getDescription(), 'test description');
//         user.type(getDate(), '01/01/2023');
//         user.type(getTime(), '12:00pm');
//         const dropdown = screen.getByRole('combobox');
//         user.selectOptions(dropdown, within(dropdown).getByRole('option', {
//             name: /seattle/i
//           }));
//         // user.click(screen.getByRole('option', {
//         //     name: /seattle/i
//         //   });)
//         user.click(getCreateButton());

//         await waitFor(() => {
//             expect(onSubmit).toHaveBeenCalledTimes(1);
//         });

//         expect(onSubmit).toHaveBeenCalledWith({
//             description: 'test description',
//             date: '01/01/2023',
//             time: '12:00pm',
//             location: 'Seattle',
//         })
//      })
// });

// const getDescription = () => {
//     return screen.getByPlaceholderText(/description/i);
// }
// const getDate = () => {
//     return screen.getByPlaceholderText(/date/i);
// }
// const getTime = () => {
//     return screen.getByPlaceholderText(/time/i);
// }
// const getCreateButton = () => {
//     return screen.getByRole('button', {
//         name: /create/i
//       });
// }


test('submits form when button is clicked', () => {
    const onSubmit = jest.fn();
    render(<Appointments onSubmit={onSubmit} />);

    const description = screen.getByPlaceholderText(/description/i);;
    const date = screen.getByPlaceholderText(/date/i);
    const time = screen.getByPlaceholderText(/time/i);
    const location = screen.getByRole('option', {
        name: /seattle/i
      });
    const button = screen.getByRole('button', {
        name: /create/i
      });
      
    userEvent.type(description, 'test description');
    userEvent.type(date, '01/01/2021');
    userEvent.type(time, '12:00pm');
    userEvent.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1)
})


// 'An appointment should be properly added to the list state array'