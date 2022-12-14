import { render, screen, waitFor, within} from "@testing-library/react";
import React from 'react';
import { Appointments } from "../Appointments";
import userEvent from "@testing-library/user-event";


describe('submits form when button is clicked', () => {

    const onSubmit = jest.fn();
    render(<Appointments onSubmit={onSubmit} />);

    const description = screen.getByTestId('description-input');
    const date = screen.getByPlaceholderText(/dd\/mm\/yyyy/i);
    const time = screen.getByPlaceholderText(/eg\. 12:30pm/i);
    const location = screen.getByRole('combobox');
    const button = screen.getByRole('button', {
        name: /create/i
      });
      
    userEvent.type(description, 'test description');
    userEvent.type(date, '01/01/2023');
    userEvent.type(time, '12:00pm');
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', {
        name: /seattle/i
      }),
    )
    userEvent.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
        description: 'test description',
        date: '01/01/2023',
        time: '12:00pm',
        location: 'Seattle',
    })
});



// Note: Tests are incomplete. I understand the importance of testing and would have liked to finish them
// and write more complete unit/integration tests, but unforunately ran out of time