import React, { useMemo } from 'react';


export const animals = useMemo(() => [
    { value: 'Lion', label: 'Lion' },
    { value: 'Elephant', label: 'Elephant' },
  ], [])

export const zoos = useMemo(() => [
    { value: 'Safari Park', label: 'Safari Park' },
    { value: 'City Zoo', label: 'City Zoo' },
  ], [])

export const donationAmounts = useMemo(() => [
    { value: '10', label: '$10' },
    { value: '20', label: '$20' },
    { value: '40', label: '$40' },
    { value: '50', label: '$50' },
    { value: '100', label: '$100' },
  ], [])