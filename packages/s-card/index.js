import Calendar from './src/calendar'

Calendar.install = function (Vue) {
  Vue.component(Calendar.name, Calendar)
}

export default Calendar 