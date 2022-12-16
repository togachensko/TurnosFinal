export const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

export const makeDateTime = (day, time) => {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    let dt = new Date(day).setHours(hour,min);
    //let dt2 = new Date(dt).toISOString();
    return dt;
}