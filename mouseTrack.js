// import process from 'process'

let date = new Date();
date = date.toLocaleString("en-CA", {
    timeZone: "America/Vancouver",
    timeZoneName: "long",
});
const eventList = [{"appName": "Photo", "date": date}];

window.addEventListener("click", (event) => {
    let x = event.pageX;  // Horizontal
    let y = event.pageY;  // Vertical
    let time = event.timeStamp
    eventList.push({"x": x, "y": y, "timeStamp": time})
    console.log(x,y, time);
    console.log(eventList);
    // const myValue = process.env.MY_VALUE
    // console.log(myValue);
});

document.addEventListener("visibilitychange", ()=>{
    if (document.hidden) {
        fetch('https://0llgmd3moi.execute-api.us-east-1.amazonaws.com/Prod',{
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ eventList }),
            keepalive: true
        })

        localStorage.clear();

    }
})