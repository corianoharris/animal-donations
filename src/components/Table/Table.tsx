// components/TransactionHistoryTable.tsx

import React from 'react'
import { TransactionHistoryTableProps } from '../../types'

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ transactions, showNoHistoryMessage }) =>
{
    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg text-black p-4 max-h-full" data-testid="transaction-table">
            <div className='flex justify-around items-center mb-4'>
            <h2 className="text-2xl font-bold text-center ">Transaction History</h2>
            <h5 className='text-2x text-indigo-600'>{transactions.length === 0 ? "" : transactions.length === 1 ? `${transactions.length} receipt` : `${transactions.length} receipts`}</h5>
            </div>
            { showNoHistoryMessage ? (
                <p className="text-center text-gray-500">No transaction history</p>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-scroll p-2">
                {transactions.map((transaction, index) => (
                    <div key={index} className=" flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm w-full ">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center mr-4">
                                <span className="text-lg font-semibold">{transaction.animal.charAt(0)}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{transaction.animal}</h3>
                                <p className="text-sm text-gray-500">{transaction.zoo}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">${transaction.amount}</p>
                            <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            )}
            
        </div>
    )
}

export default TransactionHistoryTable
