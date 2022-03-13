function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function addHours(date, hours) {
    date.setTime(date.getTime() + (hours*60*60*1000));
    return date;
}

function turnTwoDigits(nb){
    if(nb < 10){
        return `0${nb}`
    } else {
        return nb
    }
}

export {addDays, addHours, turnTwoDigits}