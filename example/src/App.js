import { addDays, format } from 'date-fns'
import React, { useState } from 'react'
import Reactanggal from 'reactanggal'
import 'reactanggal/dist/reactanggal.css'

const minDate = addDays(new Date(), -1)
const maxDate = addDays(new Date(), 2)

const App = () => {
  const [date, setDate] = useState(null)

  return (
    <div>
      <p>{date && format(date, 'dd MM yyyy')}</p>
      <Reactanggal
        selected={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  )
}

export default App
