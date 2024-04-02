import React, { useMemo } from 'react'
import { Navigate, Week } from 'react-big-calendar'

type CustomWeekViewProps = {
  date: Date
  localizer: any
  max?: Date
  min?: Date
  scrollToTime?: Date
}

export default function CustomWeekView({
  date,
  localizer,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}: CustomWeekViewProps) {
  const currRange = useMemo(
    () => CustomWeekView.range(date, { localizer }),
    [date, localizer],
  )

  return (
    <Week
      date={date}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}

CustomWeekView.range = (date: Date, { localizer }: { localizer: any }) => {
  const start = date
  const end = localizer.add(start, 2, 'day')

  let current = start
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range
}

CustomWeekView.navigate = (
  date: Date,
  action: any,
  { localizer }: { localizer: any },
) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day')

    default:
      return date
  }
}

CustomWeekView.title = (date: Date, { localizer }: { localizer: any }) => {
  const [start, ...rest] = CustomWeekView.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}
