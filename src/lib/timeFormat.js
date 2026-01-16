const timeFormat = (minutes)=> {
    const hours = Math.floor(minutes/60)
    const minutesRemander = minutes % 60
    return `${hours}h ${minutesRemander}m`
}

export default timeFormat