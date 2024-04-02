import { useCallback, useMemo, useState } from 'react'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import {
  Calendar,
  View,
  dateFnsLocalizer,
  Navigate,
  Event,
  stringOrDate,
} from 'react-big-calendar'
// import CustomWeekView from './CustomWeekCalendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../style/task-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: 'Task1',
    allDay: true, // このイベントは一日中続きます
    start: new Date(2024, 3, 18, 10, 0), // 4月18日 10:00 AM
    end: new Date(2024, 3, 18, 14, 0), // 4月18日 2:00 PM
  },
  {
    title: 'Task2',
    allDay: true, // このイベントは一日中続きます
    start: new Date(2024, 3, 20, 10, 0), // 4月20日 10:00 AM
    end: new Date(2024, 3, 20, 14, 0), // 4月20日 2:00 PM
  },
  {
    title: 'Task3',
    allDay: true, // このイベントは一日中続きます
    start: new Date(2024, 3, 20, 10, 0), // 4月20日 10:00 AM
    end: new Date(2024, 3, 20, 14, 0), // 4月20日 2:00 PM
  },
]

const TasksCalendar = () => {
  const [view, setView] = useState<View>('month')
  const [date, setDate] = useState(new Date())

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
  }

  const { views, ...otherProps } = useMemo(
    () => ({
      views: {
        month: true,
        // week: CustomWeekView,
        day: true,
      },
      // ... other props
    }),
    [],
  )

  return (
    <div className='task-calendar'>
      <Calendar
        localizer={localizer}
        events={events}
        // eventPropGetter={eventPropGetter}
        // onSelectEvent={(event) => {
        //   console.log('event:', event)
        // }}
        views={['month', 'week']}
        // views={views}
        style={{ height: 800 }}
        defaultView='week' // 初期表示は月ビュー
        toolbar={true} // ツールバーを表示する
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
      />
    </div>
  )
}

export { TasksCalendar }
