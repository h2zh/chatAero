


export function isBetween(date: Date, start: Date, end: Date): boolean{
    return date >= start && date <= end;
}

function hasNumber(myString: string) {
    return /\d/.test(myString);
}

export function toDate(inputDate: number | string): Date{
    let timeStr = null
    if(typeof inputDate === 'number') {
         timeStr = inputDate.toString();
    } // convert to string
    else if(typeof inputDate === 'string') {
        timeStr = inputDate.replace(/\D/g,''); // remove non-digits
        if (!hasNumber(timeStr)) {
            return new Date(Date.UTC(2099,12))   // edge case: PERM is not a date
        } 
    } // handle the string
    else if (timeStr === null) {
        return new Date(Date.UTC(2999,12)) 
    }   // handle the error
    const centryTwoDigits = parseInt(timeStr.slice(0, 2)) < 40 ? "20" : "19"; // config the century prefix
    const year = parseInt(centryTwoDigits.toString() + timeStr.slice(0, 2));
    const month = parseInt(timeStr.slice(2, 4));
    const day = parseInt(timeStr.slice(4, 6));
    const hour = parseInt(timeStr.slice(6, 8));
    const minute = parseInt(timeStr.slice(8, 10));
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

    return date
}