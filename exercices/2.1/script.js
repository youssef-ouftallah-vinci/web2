
function addDateTime(message) {
    const dateTimeNow = new Date();
    const popUp = dateTimeNow.toLocaleDateString() + dateTimeNow.toLocaleTimeString() + " : " + message;
    return popUp;
}

alert(addDateTime('Yo'));