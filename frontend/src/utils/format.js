import moment from "moment"

export const formatDate = (date) => {
  const d = new Date(date)
  return moment(d).format("MMM DD [at] h:mm a")
}

export const formatTime = (date) => {
  const d = new Date(date)
  return moment(d).format("h:mm a")
}

export const formatSleepDate = (date) => {
  const d = new Date(date)
  return moment(d).subtract(1, "days").format("MMM Do[,] YYYY")
}