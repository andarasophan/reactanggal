# reactanggal

> A date picker component for React

[![NPM](https://img.shields.io/npm/v/reactanggal.svg)](https://www.npmjs.com/package/reactanggal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save reactanggal
```

## Usage

```jsx
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
```

## License

MIT © [andarasophan](https://github.com/andarasophan)
