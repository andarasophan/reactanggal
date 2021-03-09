import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import CalendarHeader from './CalendarHeader'
import { ReactanggalContext } from './context'
import CalendarBody from './CalendarBody'
import { addMonths, addYears, endOfDay, endOfMonth, endOfYear, getYear, isAfter, isBefore, startOfDay, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns'
import { myGetYearStart } from './helpers'

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
  const [forceFocus, setForceFocus] = useState(true)

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

  const {
    step,
    setPreSelection = () => { },
    preSelection,
    setPreSelectionYear,
    preSelectionYear,
    minDate,
    maxDate
  } = useContext(ReactanggalContext)

  const handleDisabledPrevious = useMemo(() => {
    if (step === 0 && minDate) return isBefore(endOfMonth(subMonths(preSelection, 1)), minDate)
    if (step === 1) {
      const firstYearPreSelectionYear = myGetYearStart(preSelectionYear, 24)
      if (minDate) return (firstYearPreSelectionYear - 1) < getYear(minDate)
      return !Boolean(firstYearPreSelectionYear - 1)
    }
    if (step === 2) {
      if (minDate) return isBefore(endOfYear(subYears(preSelectionYear, 1)), minDate)
      return !Boolean(getYear(preSelectionYear) - 1)
    }
    return
  }, [preSelectionYear, step, preSelection, minDate])

  const handleDisabledNext = useMemo(() => {
    if (!maxDate) return false
    if (step === 0) return isAfter(startOfMonth(addMonths(preSelection, 1)), maxDate)
    if (step === 1) return (myGetYearStart(preSelectionYear, 24) + 24) > getYear(maxDate)
    if (step === 2) return isAfter(startOfYear(addYears(preSelectionYear, 1)), maxDate)
    return
  }, [step, preSelection, maxDate, preSelectionYear])

  const handleNext = useCallback(() => {
    if (handleDisabledNext) return
    if (step === 0) setPreSelection(addMonths(preSelection, 1))
    else if (step === 1) setPreSelectionYear(addYears(preSelectionYear, 24))
    else if (step === 2) setPreSelectionYear(addYears(preSelectionYear, 1))
  }, [handleDisabledNext, step, preSelection, preSelectionYear])

  const handlePrevious = useCallback(() => {
    if (handleDisabledPrevious) return
    if (step === 0) setPreSelection(subMonths(preSelection, 1))
    else if (step === 1) setPreSelectionYear(subYears(preSelectionYear, 24))
    else if (step === 2) setPreSelectionYear(subYears(preSelectionYear, 1))
  }, [handleDisabledPrevious, step, preSelection, preSelectionYear])

  // https://www.kirupa.com/html5/detecting_touch_swipe_gestures.htm
  useEffect(() => {
    let xDown: null | Number = null
    let yDown: null | Number = null
    const handleTouchStart = (e: TouchEvent) => {
      if (!calendarRef.current?.contains(e.target as HTMLElement)) return
      const firstTouch = e.touches[0]
      xDown = firstTouch.clientX
      yDown = firstTouch.clientY
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!xDown || !yDown) return
      const firstTouch = e.touches[0]
      const xUp = firstTouch.clientX;
      const yUp = firstTouch.clientY;
      const xDiff = +xDown - +xUp;
      const yDiff = +yDown - +yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) handleNext()
        else handlePrevious()
      }
      xDown = null;
      yDown = null;
      e.preventDefault();
    };

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart, false);
      document.removeEventListener('touchmove', handleTouchMove, false);
    }
  }, [handlePrevious, handleNext])

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
      <CalendarHeader
        handleDisabledNext={handleDisabledNext}
        handleDisabledPrevious={handleDisabledPrevious}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <CalendarBody />
    </div>
  )
}

export default Reactanggal
