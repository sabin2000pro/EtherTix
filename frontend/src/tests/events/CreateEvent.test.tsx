import React from 'react';
import {render, screen} from "@testing-library/react";
import CreateEvent from '../../pages/events/CreateEvent'
import '@testing-library/jest-dom';

describe("Create Event Unit Tests", () => {
    it("Create Event Component Renders", () => {
        
        render(<CreateEvent />);
        const mainHeader = screen.getByRole("heading", {name: /Create Event/i});
        expect(mainHeader).toBeInTheDocument();

    })
})