import { addMonths, addYears, format, getYear, subMonths, subYears } from 'date-fns'
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
    preSelectionYear
  } = useContext(ReactanggalContext)

  const handleStep = () => {
    if (step === 0) {
      setPreSelectionYear(preSelection)
      setStep(1)
    } else setStep(0)
  }

  const handleNext = () => {
    if (step === 0) setPreSelection(addMonths(preSelection, 1))
    else if (step === 1) setPreSelectionYear(addYears(preSelectionYear, 24))
    else if (step === 2) setPreSelectionYear(addYears(preSelectionYear, 1))
  }

  const handlePrevious = () => {
    if (step === 0) setPreSelection(subMonths(preSelection, 1))
    else if (step === 1) setPreSelectionYear(subYears(preSelectionYear, 24))
    else if (step === 2) setPreSelectionYear(subYears(preSelectionYear, 1))
  }

  const renderStepView = useMemo(() => {
    if (step === 0) return format(preSelection, 'MMMM yyyy')
    else if (step === 1) {
      const currentYearStart = myGetYearStart(preSelectionYear, 24)
      return `${currentYearStart} - ${+currentYearStart + 23}`
    }
    else if (step === 2) return getYear(preSelectionYear)
    return
  }, [step, preSelection, preSelectionYear])

  const handleDisabledPrevious = useMemo(() => {
    //handle jg setelah ada props minDate
    if (step === 0) return
    if (step === 1) return !Boolean(myGetYearStart(preSelectionYear, 24) - 1)
    if (step === 2) return !Boolean(getYear(preSelectionYear) - 1)
    return
  }, [preSelectionYear, step])

  const handleDisabledNext = useMemo(() => {
    //pending, nanti setelah ada props maxDate
    return false
  }, [])

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
