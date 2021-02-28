import { getYear } from "date-fns"

// untuk dpt tahun awal dari suatu range tahun
export const myGetYearStart = (year: Date, totalYears: number) => {
  const getPreSelectionYear = getYear(year)
  let currentYearStart = +getPreSelectionYear % +totalYears
  currentYearStart = +getPreSelectionYear - (currentYearStart !== 0 ? currentYearStart : 24) + 1
  return currentYearStart
}
