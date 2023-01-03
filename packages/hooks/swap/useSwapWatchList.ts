import { useAtom } from 'jotai'
import React from 'react'

import { watchListAtom } from './state'

export const useSwapWatchList = () => {
  const [watchList, setWatchList] = useAtom(watchListAtom)

  const addPair = React.useCallback(
    (pair: string[]) => {
      if (watchList.some((p) => p[0] === pair[0] && p[1] === pair[1])) {
        return
      }
      setWatchList([...watchList, pair])
    },
    [watchList, setWatchList]
  )

  const removePair = React.useCallback(
    (pair: string[]) => {
      const newWatchList = watchList.filter((p) => p[0] !== pair[0] || p[1] !== pair[1])
      setWatchList(newWatchList)
    },
    [watchList, setWatchList]
  )

  return { watchList, addPair, removePair }
}
