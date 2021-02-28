import React, { useState } from 'react'
import Reactanggal from 'reactanggal'
import 'reactanggal/dist/reactanggal.css'

const App = () => {
  const [date, setDate] = useState(new Date())

  return (
    <Reactanggal
      selected={date}
      onChange={setDate}
    />
  )
}

export default App
