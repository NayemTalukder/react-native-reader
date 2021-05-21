export const dateTime = today => {
    let Month = (today.getMonth()+1).toString()
    if(Month.length === 1) Month = '0'+ Month

    let date = today.getDate().toString()
    if(date.length === 1) date = '0'+ date

    let Hours = today.getHours().toString()
    if(Hours.length === 1) Hours = '0'+ Hours

    let Minutes = today.getMinutes().toString()
    if(Minutes.length === 1) Minutes = '0'+ Minutes

    let Seconds = today.getSeconds().toString()
    if(Seconds.length === 1) Seconds = '0'+ Seconds

    const fullDate = today.getFullYear()+'-'+Month+'-'+date;
    const time = Hours + ":" + Minutes + ":" + Seconds;

    return fullDate +' '+ time;
}

export const dateUnderscore = today => {
    let Month = (today.getMonth()+1).toString()
    if(Month.length === 1) Month = '0'+ Month

    let date = today.getDate().toString()
    if(date.length === 1) date = '0'+ date

    return today.getFullYear()+'_'+Month+'_'+date;
}
