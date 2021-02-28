import { createContext } from "react";

interface IReactanggalProvider {
  currentSelected?: Date | null | undefined
  setCurrentSelected: (value: Date | null | undefined) => void
  step?: number
  setStep: (value: number) => void
  preSelection: Date
  setPreSelection?: (value: Date) => void
  preSelectionYear: Date
  setPreSelectionYear: (value: Date) => void
  minDate: Date | null | undefined
  maxDate: Date | null | undefined
  showOutsideMonth: boolean
}

export const ReactanggalContext = createContext<IReactanggalProvider>({
  setPreSelectionYear: () => { },
  setPreSelection: () => { },
  setStep: () => { },
  setCurrentSelected: () => { },
  preSelection: new Date(),
  preSelectionYear: new Date(),
  minDate: null,
  maxDate: null,
  showOutsideMonth: false
});
