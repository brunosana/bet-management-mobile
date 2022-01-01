const getFormatedDay = (day: number) => {
    if(day < 10){
        return `0${day}`
    }
    return day;
}

const getFormatedMoth = (moth: number) => {
    if(moth+1 < 10){
        return `0${moth+1}`
    }
    return moth+1;
}

const getFormatedDate = (date: Date) => {
    let newDate = new Date(date);
    return getFormatedDay(newDate.getDate()) +'/' + (getFormatedMoth(newDate.getMonth())) + '/'+ newDate.getFullYear()
};

export { getFormatedDate }