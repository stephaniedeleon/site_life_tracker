import moment from "moment"

export const formatDate = (date) => {
  const d = new Date(date)
  return moment(d).format("MMM DD [at] h:mm a")
}