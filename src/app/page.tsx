// app/animal-donation/page.tsx
'use client'

import React, { useMemo, useReducer } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { DonationFormProps, FormInputsProps, TransactionProps } from '@/types'

import Select from '@/components/Select/Select'
import Button from '@/components/Button/Button'
import TransactionHistoryTable from '../components/Table/Table'


type State = {
  purseBalance: number
  currentBalance: number
  isSameBalance: boolean
  isProcessing: boolean
  transactions: TransactionProps[],
}

type Action =
  | { type: 'SUBMIT_DONATION'; payload: TransactionProps }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'INSUFFICIENT_FUNDS'; payload: boolean }

const initialState: State = {
  purseBalance: 200,
  isProcessing: false,
  transactions: [],
  isSameBalance: false,
  currentBalance: 0,
}



function reducer(state: State, action: Action): State
{
  switch (action.type)
  {
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
    case 'INSUFFICIENT_FUNDS':
      return {
        ...state,
        isSameBalance: action.payload,
        currentBalance: state.purseBalance,
      }
    default:
      return state
  }
}

const AnimalDonationPage: React.FC<DonationFormProps> = ({ isProcessing }) =>
{
  const [state, dispatch] = useReducer(reducer, initialState)
  // Use react-hook-form for form handling
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<FormInputsProps>()

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)

  const animalsData = useMemo(() => [
    { value: 'Cheetahs', label: 'Cheetahs' },
    { value: 'Black Caiman', label: 'Black Caiman' },
    { value: 'Blue Dragon', label: 'Blue Dragon' },
    { value: 'Komondo Dragon', label: 'Komondo Dragon' },
  ], [])

const zoosData = useMemo(() => [
    { value: 'San Diego Zoo', label: 'San Diego Zoo' },
    { value: 'Memphis Zoo', label: 'Memphis Zoo' },
    { value: 'Seattle Zoo', label: 'Seattle Zoo' },
    { value: 'Mississippi Zoo', label: 'Mississippi Zoo' },
  ], [])

 const donationAmountsData = useMemo(() => [
    { value: '10', label: '$10' },
    { value: '20', label: '$20' },
    { value: '40', label: '$40' },
    { value: '50', label: '$50' },
    { value: '100', label: '$100' },
  ], [])

  const onSubmit: SubmitHandler<FormInputsProps> = async (data) =>
  {

    const amount = parseInt(data.amount, 10)

    setIsButtonDisabled(true)

    if (state.purseBalance === 0)
    {
      setIsButtonDisabled(true)
      dispatch({ type: 'SET_PROCESSING', payload: false })
    } else
    {
      setIsButtonDisabled(false)
      dispatch({ type: 'SET_PROCESSING', payload: true })
    }

    if (amount > state.purseBalance)
    {
      toast.error(`Insufficient balance. You only have $${state.purseBalance} available.`);

      dispatch({ type: 'INSUFFICIENT_FUNDS', payload: true })
      return;
    }

    if (state.isSameBalance)
    {
      state.purseBalance = state.currentBalance
    } else dispatch({ type: 'INSUFFICIENT_FUNDS', payload: false })


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
    <>
      <div className='min-h-screen bg-gray-100 p-4'>
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
                  <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white rounded-2xl shadow-lg p-4 w-full max-h-100  text-indigo-500">
                    <h2 className="text-2xl font-bold text-center mb-4 text-black">Make a Donation</h2>
                    <Select
                      label="Select Animal"
                      options={animalsData}
                      {...register('animal', { required: true })}
                    />
                    <Select
                      label="Select Zoo"
                      options={zoosData}
                      {...register('zoo', { required: true })}
                    />
                    <Select
                      label="Donation Amount"
                      options={donationAmountsData}
                      {...register('amount', { required: true })}
                    />
                    <Button type="submit" isLoading={isProcessing || isSubmitting}
                      disabled={isButtonDisabled}
                      className={`mt-8 ${isButtonDisabled ? 'disabled' : ''}`} >
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
          <h5 className='text-center text-indigo-700 font-light'>Powered By Coriano Harris</h5>
      </div>
        
    </>
  )
}

export default AnimalDonationPage


