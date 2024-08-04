// app/animal-donation/page.tsx
'use client'

import React, { useMemo, useReducer, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '../components/Button/Button'
import Select from '../components/Select/Select'
import TransactionHistoryTable from '../components/Table/Table'


import { FormInputsProps,  TransactionProps }  from '@/types'


type State  = {
  purseBalance: number
  isProcessing: boolean
  transactions: TransactionProps[],
}

type Action =
  | { type: 'SUBMIT_DONATION'; payload: TransactionProps }
  | { type: 'SET_PROCESSING'; payload: boolean }

const initialState: State = {
  purseBalance: 200,
  isProcessing: false,
  transactions: [],
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SUBMIT_DONATION':
      return {
        ...state,
        purseBalance: state.purseBalance - action.payload.amount,
        transactions: [action.payload, ...state.transactions],
      }
    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      }
    default:
      return state
  }
}

const AnimalDonationPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormInputsProps>()

  const animals = useMemo(() => [
    { value: 'Cheetahs', label: 'Cheetahs' },
    { value: 'Black Caimans', label: 'Black Caimans' },
  ], [])

  const zoos = useMemo(() => [
    { value: 'San Diego Zoo', label: 'San Diego Zoo' },
    { value: 'Memphis Zoo', label: 'Memphis Zoo' },
  ], [])

  const donationAmounts = useMemo(() => [
    { value: '10', label: '$10' },
    { value: '20', label: '$20' },
    { value: '40', label: '$40' },
    { value: '50', label: '$50' },
    { value: '100', label: '$100' },
  ], [])

  const onSubmit: SubmitHandler<FormInputsProps> = async (data) => {
    const amount = parseInt(data.amount, 10)
    if (amount > state.purseBalance) {
      toast.error('Insufficient balance in your purse')
      return
    }

    dispatch({ type: 'SET_PROCESSING', payload: true })

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const transaction: TransactionProps = {
      animal: data.animal,
      zoo: data.zoo,
      amount: amount,
      date: new Date().toISOString(),
    }

    dispatch({ type: 'SUBMIT_DONATION', payload: transaction })
    dispatch({ type: 'SET_PROCESSING', payload: false })

    


    toast.success(`Thanks for donating $${amount} to ${data.zoo} for ${data.animal}. Want to donate again?`)
    reset()
  }

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
            
            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto bg-white rounded-2xl shadow-lg p-4  w-full">
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
              <Button type="submit" isLoading={state.isProcessing || isSubmitting} className='mt-8'>
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

export default AnimalDonationPage


