import { render } from "@testing-library/react";
import Alert from "./Alert";

test('If any form input fields are left empty, the no empty fields alert should be rendered', () => {
    render(<Alert/>)
})