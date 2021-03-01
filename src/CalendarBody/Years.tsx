import clsx from 'clsx'
import { getYear, setYear } from 'date-fns'
import React, { useContext, useMemo } from 'react'
import { ReactanggalContext } from '../context'

interface IYears {
  yearStart: string | number,
  yearColumn: string | number
}

interface IYear {
  year: number
}

const Years: React.FC<IYears> = ({
  yearStart,
  yearColumn
}) => {
  const renderYears = useMemo(() => {
    const years = []
    for (let i = 0; i < 4; i++) {
      years.push(
        <Year
          key={`yearColumn-${yearColumn}-year-${i}`}
          year={+yearStart + i}
        />
      )
    }
    return years
  }, [yearColumn, yearStart])

  return (
    <div className="reactanggal__calendar-years">
      {renderYears}
    </div>
  )
}

const Year: React.FC<IYear> = ({
  year
}) => {
  const {
    currentSelected,
    preSelection,
    preSelectionYear,
    setPreSelection = () => { },
    setPreSelectionYear,
    setStep,
    minDate,
    maxDate
  } = useContext(ReactanggalContext)

  const isFocusable = useMemo(() => +year === +getYear(preSelectionYear), [year, preSelectionYear])

  const isDisabled = useMemo(() => {
    if (!minDate && !maxDate) return
    return (minDate && year < getYear(minDate)) || (maxDate && year > getYear(maxDate))
  }, [minDate, maxDate, year])

  const handleClick = () => {
    if (isDisabled) return
    setPreSelectionYear(setYear(preSelection, year))
    setPreSelection(setYear(preSelection, year))
    setStep(2)
  }

  return (
    <div
      tabIndex={isFocusable ? 0 : -1}
      className={clsx(
        "reactanggal__button reactanggal__calendar-year",
        +year === +getYear(new Date()) && 'reactanggal__calendar-year--today',
        (currentSelected && +year === +getYear(currentSelected)) && 'reactanggal__calendar-year--selected',
        isDisabled && 'reactanggal__calendar-year--disabled'
      )}
      onClick={handleClick}
    >
      {year}
    </div>
  )
}

export default Years
