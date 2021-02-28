import React, { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import { ReactanggalContext } from './context'
import CalendarBody from './CalendarBody'
import { endOfDay, startOfDay } from 'date-fns'

interface IReactanggal {
  selected?: Date | null | undefined
  onChange?: (value: Date | null | undefined) => void,
  minDate?: Date | null | undefined,
  maxDate?: | null | undefined,
  showOutsideMonth?: boolean
}

const Reactanggal: React.FC<IReactanggal> = ({
  selected,
  onChange = () => { },
  minDate,
  maxDate,
  showOutsideMonth = false
}) => {
  const [step, setStep] = useState(0)
  const [preSelection, setPreSelection] = useState(selected || minDate || maxDate || new Date())
  const [preSelectionYear, setPreSelectionYear] = useState(new Date())

  return (
    <ReactanggalContext.Provider value={{
      currentSelected: selected,
      setCurrentSelected: onChange,
      step,
      setStep,
      preSelection,
      setPreSelection,
      preSelectionYear,
      setPreSelectionYear,
      minDate: minDate ? startOfDay(minDate) : minDate,
      maxDate: maxDate ? endOfDay(maxDate) : maxDate,
      showOutsideMonth
    }}
    >
      <ReactanggalRoot />
    </ReactanggalContext.Provider>
  )
}

const ReactanggalRoot = () => {
  return (
    <div className="reactanggal__calendar">
      <CalendarHeader />
      <CalendarBody />
    </div>
  )
}

export default Reactanggal
