
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'

import AnimalDonationPage from './page';

import { animalsList, zoosList, donationAmountsList } from '@/mockData';// Use named import or default based on your export


// mocking

const formInputs = jest.createMockFromModule('../mockData');


describe('AnimalDonationPage', () =>
{

    beforeEach(() =>
    {
        render(<AnimalDonationPage isProcessing={true} />);
    });

    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    test('renders a heading', () =>
    {

        const heading = screen.getByRole('heading', {
            name: /Animal Donation/i,
        })

        expect(heading).toBeInTheDocument()
    })

    test('renders the donation form and initial balance of $200 correctly', () =>
    {
        expect(screen.getByTestId('page-title')).toHaveTextContent('Animal Donation');
        expect(screen.getByTestId('balance-amount')).toHaveTextContent('$200');

        expect(screen.getByTestId('donation-form')).toBeInTheDocument();

        expect(screen.getByTestId('animal-dropdown')).toBeInTheDocument();
        expect(screen.getByTestId('zoo-dropdown')).toBeInTheDocument();
        expect(screen.getByTestId('donation-amount-dropdown')).toBeInTheDocument();

        expect(screen.getByTestId('submit-donation-btn')).toBeInTheDocument();

        expect(screen.getByTestId('transaction-table')).toBeInTheDocument();
        expect(screen.queryByText('No donation history')).not.toBeInTheDocument();
    })

    test('submits a donation', async () =>
    {
        const user = userEvent.setup();

        await user.selectOptions(screen.getByTestId('animal-dropdown'), 'Cheetahs');
        await user.selectOptions(screen.getByTestId('zoo-dropdown'), 'Memphis Zoo');
        await user.selectOptions(screen.getByTestId('donation-amount-dropdown'), '10');

        const button = screen.getByTestId('submit-donation-btn');
        await userEvent.click(button);
    });

    // test('should display the correct balance amount after submitting donation successfully', async () =>
    // {

    //     // Use waitFor if you need to wait for specific changes in the DOM
    //     await waitFor(async () =>
    //     {
    //         const balanceEl = await screen.getByTestId('balance-amount');

    //         // Assert the text content
    //         expect(balanceEl.textContent).toBe('$190');
    //     }, { timeout: 4000 });



    // });


})