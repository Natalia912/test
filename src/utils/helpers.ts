
// difference between now and the date in args
export const getDif = (date: string) => {
  const date1 = new Date(date)
  const date2 = new Date()
  const diffTime = date1.getTime() - date2.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export const formatDate = (date:string) => {
  const dateToFormat = new Date(date)
  const day = dateToFormat.getDate()
  const month = dateToFormat.getMonth() + 1
  const year = dateToFormat.getFullYear()
  if (day && month && year) {
    return (day > 9 ? day : '0' + day) + '.' + (month > 9 ? month : '0' + month) + '.' + year
  } 
  return ''
}