# Animal Donation Application

This is a Next.js application with TypeScript that allows users to make donations to animals at various zoos. The application uses the latest version of Next.js and React (as of April 2024).

## Features

- Select an animal from a list of options (Lion, Elephant)
- Choose a participating zoo (Safari Park, City Zoo)
- Select a donation amount ($10, $20, $40, $50, $100)
- Display a purse balance that updates with donations
- Submit button with processing state
- Toast notifications for successful donations and errors

## Technologies Used

- Next.js (latest version)
- React version 18
- TypeScript
- react-hook-form
- react-toastify
- Tailwind CSS

## Project Structure


├── app/
│ └── animal-donation/
│ └── page.tsx
├── components/
│ ├── Button.tsx
│ ├── Select.tsx
│ └── Table.tsx (TransactionHistoryTable.tsx)
└── README.md

## Setup

1. Clone the repository
2. Install dependencies:

```npm install```

3. Install additional dependencies:

```npm install react-hook-form react-toastify```

4. Ensure Tailwind CSS is set up in your Next.js project

## Components

### Button Component (`components/Button.tsx`)

A client-side button component that handles loading state and styling.

### Select Component (`components/Select.tsx`)

A server-side select component for reusable dropdown functionality.

### Transaction History Table Component (`components/Table.tsx`)

A server-side table component for reusable table to display items in a row.

A server-side select component for reusable dropdown functionality.

### AnimalDonationPage (`app/animal-donation/page.tsx`)

The main page component that integrates all features of the animal donation application.

## Key Implementation Details

- Uses `useMemo` for optimized performance on static data (animals, zoos, donation amounts)
- Implements `useForm` from react-hook-form for efficient form management
- Utilizes TypeScript for improved type safety
- Employs Tailwind CSS for styling
- Uses react-toastify for toast notifications
- Table with alternating row colors for better readability.

## Usage

1. Navigate to the animal donation page in your browser
2. Select an animal from the dropdown
3. Choose a zoo from the dropdown
4. Select a donation amount
5. Click the "Submit Donation" button
6. View the toast notification for confirmation or error messages

## Development

To run the development server:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

- Ensure that your `layout.tsx` file is set up correctly to render the page content
- This application uses client-side rendering for interactive elements and server-side rendering for static components
- The purse balance is maintained in the component state and will reset on page refresh

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT](https://choosealicense.com/licenses/mit/)