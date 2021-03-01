# reactanggal

[![NPM](https://img.shields.io/npm/v/reactanggal.svg)](https://www.npmjs.com/package/reactanggal)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Downloads](https://img.shields.io/npm/dm/reactanggal.svg)](https://npmjs.org/package/reactanggal)
[![License](https://img.shields.io/npm/l/reactanggal.svg)](https://npmjs.org/package/reactanggal)

A date picker component for React
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
### Props
| Key | Default Value | Type | Description
| --- | -------- | ---- | ----------- |
| `selected` | `undefined` | `Date` / `null` / `undefined` | Selected date value
| `onChange` | `undefined` | `function` | Handle date changes
| `minDate` | `undefined` | `Date` / `null` / `undefined` | Set minimum date to select & disable earlier dates
| `maxDate` | `undefined` | `Date` / `null` / `undefined` | Set maximum date to select & disable later dates
| `showOutsideMonth` | `false` | `boolean` | Show or hide dates that fall outside the current month

## License

MIT © [andarasophan](https://github.com/andarasophan)
