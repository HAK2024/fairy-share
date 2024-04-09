import { useState, useEffect } from 'react'

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const matchQueryList = window.matchMedia(query)

    if (matchQueryList.matches !== matches) {
      setMatches(matchQueryList.matches)
    }
    const listener = () => setMatches(matchQueryList.matches)
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}
