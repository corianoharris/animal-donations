// app/animal-donation/page.tsx
'use client'

import React, { useMemo, useReducer, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '../components/Button/Button'
import Select from '../components/Select/Select'

import { FormInputsProps } from '@/types'


type State  = {
  purseBalance: number
  isProcessing: boolean
}

type Action =
  | { type: 'SUBMIT_DONATION'; payload: number }
  | { type: 'SET_PROCESSING'; payload: boolean }

const initialState: State = {
  purseBalance: 200,
  isProcessing: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SUBMIT_DONATION':
      return {
        ...state,
        purseBalance: state.purseBalance - action.payload,
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

    dispatch({ type: 'SUBMIT_DONATION', payload: amount })
    dispatch({ type: 'SET_PROCESSING', payload: false })


    toast.success(`Thanks for donating $${amount} to ${data.zoo} for ${data.animal}. Want to donate again?`)
    reset()
  }

  return (
    <div className="container mx-auto  bg-slate-300 my-auto p-4 place-content-center w-1/2 shadow-lg rounded-md">
    
      <h1 className="text-5xl font-bold m-5 text-black">Animal Donation</h1>

          <h3 className="font-bold text-right m-4 text-black">Balance:<span className='rounded-full border-2 bg-indigo-500 p-2 text-center mx-2 text-white'> ${state.purseBalance}</span></h3>
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto my-5 bg-indigo-500 p-6 rounded-t-lg">
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

        
      <div className='flex justify-end'>
      <Button type="submit" isLoading={state.isProcessing || isSubmitting}>
          Submit Donation
        </Button>
      </div>
        

      </form>

      <ToastContainer position="top-right" />
    </div>
  )
}

export default AnimalDonationPage