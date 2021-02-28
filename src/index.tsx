import React, { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import { ReactanggalContext } from './context'
import CalendarBody from './CalendarBody'

interface IReactanggal {
  selected?: Date | null | undefined
  onChange: (value: Date | null | undefined) => void
  showOutsideMonth?: boolean
}

const Reactanggal: React.FC<IReactanggal> = ({
  selected,
  onChange = () => { },
  showOutsideMonth = false
}) => {
  const [step, setStep] = useState(0)
  const [preSelection, setPreSelection] = useState(selected || new Date())
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
