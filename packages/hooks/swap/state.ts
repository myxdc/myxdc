import { atomWithStorage } from 'jotai/utils'

export const watchListAtom = atomWithStorage<string[][]>('myxdc:swap:watchList', [])
