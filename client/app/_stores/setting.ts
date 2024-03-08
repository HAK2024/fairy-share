import { create } from 'zustand'
import type { StateCreator } from 'zustand'

const storeResetFns = new Set<() => void>()

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn()
  })
}

export const customCreate = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = create(stateCreator)
    const initialState = store.getState()
    storeResetFns.add(() => {
      store.setState(initialState, true)
    })
    return store
  }
}) as typeof create
