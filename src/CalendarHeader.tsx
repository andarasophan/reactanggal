import { addMonths, addYears, endOfMonth, endOfYear, format, getYear, isAfter, isBefore, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns'
import React, { useContext, useMemo } from 'react'
import { ReactanggalContext } from './context'
import { myGetYearStart } from './helpers'

const CalendarHeader = () => {
  const {
    setStep,
    step,
    setPreSelection = () => { },
    preSelection,
    setPreSelectionYear,
    preSelectionYear,
    minDate,
    maxDate
  } = useContext(ReactanggalContext)

  const handleStep = () => {
    if (step === 0) {
      setPreSelectionYear(preSelection)
      setStep(1)
    } else setStep(0)
  }

  const handleNext = () => {
    if (handleDisabledNext) return
    if (step === 0) setPreSelection(addMonths(preSelection, 1))
    else if (step === 1) setPreSelectionYear(addYears(preSelectionYear, 24))
    else if (step === 2) setPreSelectionYear(addYears(preSelectionYear, 1))
  }

  const handlePrevious = () => {
    if (handleDisabledPrevious) return
    if (step === 0) setPreSelection(subMonths(preSelection, 1))
    else if (step === 1) setPreSelectionYear(subYears(preSelectionYear, 24))
    else if (step === 2) setPreSelectionYear(subYears(preSelectionYear, 1))
  }

  const renderStepView = useMemo(() => {
    if (step === 0) return format(preSelection, 'MMMM yyyy')
    if (step === 1) {
      const currentYearStart = myGetYearStart(preSelectionYear, 24)
      return `${currentYearStart} - ${+currentYearStart + 23}`
    }
    if (step === 2) return getYear(preSelectionYear)
    return
  }, [step, preSelection, preSelectionYear])

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

  return (
    <div className="reactanggal__header">
      <button
        className="reactanggal__button reactanggal__header-period-control-button"
        onClick={handleStep}
      >
        {renderStepView}
      </button>
      <div>
        <button
          disabled={handleDisabledPrevious}
          className="reactanggal__button reactanggal__header-arrow-button reactanggal__header-arrow-button--previous"
          onClick={handlePrevious}
        />
        <button
          disabled={handleDisabledNext}
          className="reactanggal__button reactanggal__header-arrow-button reactanggal__header-arrow-button--next"
          onClick={handleNext}
        />
      </div>
    </div>
  )
}

export default CalendarHeader
