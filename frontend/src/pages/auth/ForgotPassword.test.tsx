import React from 'react'
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

describe("Forgot Password Unit Test Suite", () => {
    it("Forgot Password Renders No Crash", () => {

        render(
            <MemoryRouter>

            </MemoryRouter>
            
        )
    })
})