import clsx from 'clsx'
import { addMonths, format, getMonth, isSameYear, setMonth, startOfYear } from 'date-fns'
import React, { useContext } from 'react'
import { ReactanggalContext } from '../context'

const monthsArr = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]

const firstMonth = startOfYear(new Date())

const Months = () => {
  return <div>
    {
      monthsArr.map((el, i) => (
        <div key={`monthColumn-${i}`} className="reactanggal__calendar-months">
          {el.map(num => (
            <Month
              key={`month-${num}`}
              month={num}
            />
          ))}
        </div>
      ))
    }
  </div>
}

interface IMonth {
  month: number
}

const Month: React.FC<IMonth> = ({
  month
}) => {
  const { currentSelected, preSelectionYear, setPreSelection = () => { }, setStep } = useContext(ReactanggalContext)

  const handleClick = () => {
    setPreSelection(setMonth(preSelectionYear, month))
    setStep(0)
  }

  return (
    <div
      className={clsx(
        "reactanggal__button reactanggal__calendar-month",
        (+month === +getMonth(new Date()) && isSameYear(preSelectionYear, new Date())) && 'reactanggal__calendar-month--today',
        (currentSelected && +month === +getMonth(currentSelected) && isSameYear(preSelectionYear, currentSelected)) && 'reactanggal__calendar-month--selected'
      )}
      onClick={handleClick}
    >
      {format(addMonths(firstMonth, month), 'MMMM')}
    </div>
  )
}

export default Months
