import React from 'react';  // Import React library
import { TransactionHistoryTableProps } from '../types';  // Import the type for the component's props

// Define the TransactionHistoryTable component
const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ transactions, showNoHistoryMessage }) => {
    return (
        // Main container for the table
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg text-black p-2">
            <h2 className="text-2xl font-bold text-center mb-4">Transaction History</h2>
            {/* Heading for the table */}

            { showNoHistoryMessage ? (
                // Show a message if there are no transactions
                <p className="text-center text-gray-500">No transaction history</p>
            ) : (
                // Show the list of transactions if there are any
                <div className="space-y-4">
                    {/* Container for each transaction with spacing between items */}
                    {transactions.map((transaction, index) => (
                        // Loop through each transaction and display it
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm w-full">
                            {/* Container for individual transaction item */}
                            <div className="flex items-center">
                                {/* Container for the left side of the transaction */}
                                <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center mr-4">
                                    {/* Circle with the first letter of the animal */}
                                    <span className="text-lg font-semibold">{transaction.animal.charAt(0)}</span>
                                </div>
                                <div>
                                    {/* Container for the animal and zoo details */}
                                    <h3 className="text-lg font-bold">{transaction.animal}</h3>
                                    {/* Animal name */}
                                    <p className="text-sm text-gray-500">{transaction.zoo}</p>
                                    {/* Zoo name */}
                                </div>
                            </div>
                            <div className="text-right">
                                {/* Container for the right side of the transaction */}
                                <p className="text-lg font-semibold">${transaction.amount}</p>
                                {/* Amount of the transaction */}
                                <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                                {/* Date of the transaction formatted as a local date string */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TransactionHistoryTable;
// Export the TransactionHistoryTable component so it can be used in other parts of the application
