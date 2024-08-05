// Import necessary libraries and components
'use client'  // This tells the React component to run on the client side

import React, { useMemo, useReducer, useRef } from 'react'  // Import React and hooks
import { useForm, SubmitHandler } from 'react-hook-form'  // Import hooks for form handling
import { toast, ToastContainer } from 'react-toastify'  // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'  // Import toast notifications CSS
import Button from '../components/Button/Button'  // Import Button component
import Select from '../components/Select/Select'  // Import Select component
import TransactionHistoryTable from '../components/Table/Table'  // Import TransactionHistoryTable component

// Import types for form inputs and transactions
import { FormInputsProps, TransactionProps } from '@/types'

// Define the state structure
type State = {
    purseBalance: number  // Amount of money in the purse
    isProcessing: boolean  // Indicates if a donation is being processed
    transactions: TransactionProps[],  // List of transactions
}

// Define actions that can change the state
type Action =
    | { type: 'SUBMIT_DONATION'; payload: TransactionProps }  // Action for submitting a donation
    | { type: 'SET_PROCESSING'; payload: boolean }  // Action for setting the processing state

// Define the initial state
const initialState: State = {
    purseBalance: 200,  // Initial balance in the purse
    isProcessing: false,  // Initially not processing
    transactions: [],  // Initially no transactions
}

// Define the reducer function to handle state changes
function reducer(state: State, action: Action): State
{
    switch (action.type)
    {
        case 'SUBMIT_DONATION':  // Handle donation submission
            return {
                ...state,  // Keep existing state
                purseBalance: state.purseBalance - action.payload.amount,  // Deduct donation amount from purse balance
                transactions: [action.payload, ...state.transactions],  // Add the new transaction to the list
            }
        case 'SET_PROCESSING':  // Handle setting processing state
            return {
                ...state,  // Keep existing state
                isProcessing: action.payload,  // Update the processing state
            }
        default:  // Default case returns the current state
            return state
    }
}

// Define the main AnimalDonationPage component
const AnimalDonationPage: React.FC = () =>
{
    const [state, dispatch] = useReducer(reducer, initialState)  // Use reducer for state management
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormInputsProps>()  // Setup form handling

    // Memoize animal options to avoid recalculating them
    const animals = useMemo(() => [
        { value: 'Cheetahs', label: 'Cheetahs' },
        { value: 'Black Caimans', label: 'Black Caimans' },
    ], [])

    // Memoize zoo options to avoid recalculating them
    const zoos = useMemo(() => [
        { value: 'San Diego Zoo', label: 'San Diego Zoo' },
        { value: 'Memphis Zoo', label: 'Memphis Zoo' },
    ], [])

    // Memoize donation amounts to avoid recalculating them
    const donationAmounts = useMemo(() => [
        { value: '10', label: '$10' },
        { value: '20', label: '$20' },
        { value: '40', label: '$40' },
        { value: '50', label: '$50' },
        { value: '100', label: '$100' },
    ], [])

    // Handle form submission
    const onSubmit: SubmitHandler<FormInputsProps> = async (data) =>
    {
        const amount = parseInt(data.amount, 10)  // Convert amount to a number
        if (amount > state.purseBalance)
        {  // Check if there is enough balance
            toast.error('Insufficient balance in your purse')  // Show error if not enough balance
            return 
        }

        dispatch({ type: 'SET_PROCESSING', payload: true })  // Set processing to true

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Create a new transaction
        const transaction: TransactionProps = {
            animal: data.animal,
            zoo: data.zoo,
            amount: amount,
            date: new Date().toISOString(),
        }

        dispatch({ type: 'SUBMIT_DONATION', payload: transaction })  // Submit the donation
        dispatch({ type: 'SET_PROCESSING', payload: false })  // Set processing to false

        // Show success message
        toast.success(`Thanks for donating $${amount} to ${data.zoo} for ${data.animal}. Want to donate again?`)
        reset()  // Reset the form
    }

    // Return the JSX to render the page
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-center shadow-lg">
                    <h1 className="text-4xl font-bold text-white">Animal Donation</h1>
                    <p className="text-white mt-2">Your current balance</p>
                    <div className="bg-white rounded-full mx-auto mt-4 p-4 w-24 h-24 flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-indigo-500">${state.purseBalance}</span>
                    </div>
                </div>
                <div className="p-3 bg-gray-50">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white rounded-2xl shadow-lg p-4 w-full">
                                <h3 className="text-xl font-semibold mb-4 text-black">Make a Donation</h3>
                                <Select
                                    label="Select Animal"
                                    options={animals}
                                    {...register('animal', { required: true })}
                                />
                                <Select
                                    label="Select Zoo"
                                    options={zoos}
                                    {...register('zoo', { required: true })}
                                />
                                <Select
                                    label="Donation Amount"
                                    options={donationAmounts}
                                    {...register('amount', { required: true })}
                                />
                                <Button type="submit" isLoading={state.isProcessing || isSubmitting} className="mt-8">
                                    Submit Donation
                                </Button>
                            </form>
                        </div>
                        <div className="flex-1">
                            <TransactionHistoryTable
                                transactions={state.transactions}
                                showNoHistoryMessage={state.purseBalance === 200}
                            />
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" />
            </div>
        </div>
    )
}

export default AnimalDonationPage  // Export the component as default
