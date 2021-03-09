import { format, getYear } from 'date-fns'
import React, { useContext, useMemo } from 'react'
import { ReactanggalContext } from './context'
import { myGetYearStart } from './helpers'

const CalendarHeader = ({
  handleDisabledNext = false,
  handleDisabledPrevious = false,
  handlePrevious = () => { },
  handleNext = () => { }
}) => {
  const {
    setStep,
    step,
    preSelection,
    setPreSelectionYear,
    preSelectionYear,
    setForceFocus
  } = useContext(ReactanggalContext)

  const handleStep = () => {
    if (step === 0) {
      setPreSelectionYear(preSelection)
      setStep(1)
      setForceFocus(true)
    } else setStep(0)
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
