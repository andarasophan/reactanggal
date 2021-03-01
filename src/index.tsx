import React, { useEffect, useRef, useState } from 'react'
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
  const [forceFocus, setForceFocus] = useState(false)

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
      showOutsideMonth,
      forceFocus,
      setForceFocus
    }}
    >
      <ReactanggalRoot />
    </ReactanggalContext.Provider>
  )
}

const ReactanggalRoot = () => {
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // for focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key != 'Tab') return
      const focusableElements = calendarRef.current?.querySelectorAll('button:not([disabled]), [tabindex="0"]')
      if (e.target === focusableElements?.[focusableElements.length - 1] && !e.shiftKey) {
        e.preventDefault();
        (focusableElements[0] as HTMLElement)?.focus()
      }
      else if (e.target === focusableElements?.[0] && e.shiftKey) {
        e.preventDefault();
        (focusableElements[focusableElements.length - 1] as HTMLElement)?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div ref={calendarRef} className="reactanggal__calendar">
      <CalendarHeader />
      <CalendarBody />
    </div>
  )
}

export default Reactanggal
