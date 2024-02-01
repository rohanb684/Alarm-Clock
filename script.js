let imageHeader = document.getElementById("header-img") ;
let currentDate = document.getElementById("curr-date");
let currentTime = document.getElementById("curr-time");
let container = document.getElementById("container");
let alarmContainer = document.getElementById("alarm-container");
let hrsInput = document.getElementById("hrs-input")
let minuteInput = document.getElementById("minute-input")
let secondInput = document.getElementById("second-input")
let meridiemiInput = document.getElementById("meridiem-input");
let alarmsEl = document.getElementsByClassName("alarms")[0];


const alarmsArray =[];
document.addEventListener("DOMContentLoaded", function(){
    dateTimeChange();
    setInterval(dateTimeChange, 1000);
})

// --- Display Current Date and time----
function dateTimeChange(){
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let curr = new Date();

    //Get Time
    let hours = curr.getHours();
    let minutes = String(curr.getMinutes()).padStart(2, "0");
    let seconds = String(curr.getSeconds()).padStart(2, "0");
    let meridiem = hours>=12 ? "PM" : "AM";

    //convert to 12 hour format
    hours = hours % 12;
    hours = String(hours ? hours : 12).padStart(2,"0");
    minutes = minutes;
    seconds = seconds;
    
    //Get Date
    let day = weekday[curr.getDay()];
    let date = curr.getDate();
    let month  = months[curr.getMonth()];
    let year = curr.getFullYear();
    
    
    // Set Date and Time
    currentDate.textContent =  `${day}, ${date} ${month} ${year}`;
    currentTime.textContent = `${hours} : ${minutes} : ${seconds} ${meridiem}`;

    //Set Image Header according to time
    if(hours>=4 && hours<11){
        imageHeader.src = 'images/sunrise.png'
        container.style.backgroundColor = "rgb(237, 182, 80)";
        alarmContainer.style.backgroundColor = "rgb(230, 207, 166)";
    }else if(hours>=11 && hours<16){
        imageHeader.src = 'images/sun.png'
        container.style.backgroundColor = "rgb(237, 182, 80)";
        alarmContainer.style.backgroundColor = "rgb(230, 207, 166)";
    }else if(hours>=16 && hours<20){
        imageHeader.src = 'images/sunset.png'
        container.style.backgroundColor = "rgb(211, 182, 127)";
        alarmContainer.style.backgroundColor = "rgb(217, 166, 71)";
    }else{
        imageHeader.src = 'images/moon.png'
        container.style.backgroundColor = "rgb(88, 85, 85)";
        alarmContainer.style.backgroundColor = "rgb(170, 160, 160)";
    }

    alarmAlert(hours,minutes, seconds, meridiem);
}



// -----Add Alarm to alarmList----
function addAlarm(){
    const hrsValue = hrsInput.value.padStart(2, "0");
    console.log(hrsValue);
    const minuteValue = minuteInput.value.padStart(2, "0");
    const secValue = secondInput.value.padStart(2, "0");
    const meridiemiValue = meridiemiInput.value.toLowerCase();
    if(hrsValue && minuteValue && secValue &&meridiemiValue){
        if(Number(hrsValue) > 0 && Number(hrsValue) <13 && Number(minuteValue) >= 0 && Number(minuteValue) < 60 && Number(secValue) >=0 && Number(secValue) <60 && (meridiemiValue == "am" || meridiemiValue == "pm" )){
        
        

        let row = document.createElement("div");
        row.className = "row";
        row.id = `alarm${alarmsArray.length+1}`;

        alarmsArray.push({id: row.id, hr:hrsValue, min: minuteValue, sec: secValue}); // push all details in alarms list Array

        let alarmTimeDiv = document.createElement("div");
        alarmTimeDiv.className = "alarm-time-div"
        row.appendChild(alarmTimeDiv);

        let alarmTime = document.createElement("p");
        alarmTime.className = "alarm-time";
        alarmTime.textContent = `${hrsValue} : ${minuteValue} : ${secValue} ${meridiemiValue.toUpperCase()}`
        alarmTimeDiv.appendChild(alarmTime);

        let delBtnDiv = document.createElement("div");
        delBtnDiv.className = "del-btn-div";
        row.appendChild(delBtnDiv);

        let delBtn = document.createElement("button");
        delBtn.className= "del-btn";
        delBtnDiv.appendChild(delBtn);

        let delIcon = document.createElement("i");
        delIcon.className = "fa-solid fa-trash";
        delBtn.appendChild(delIcon);

        delIcon.addEventListener("click",()=>{
            deleteAlarm(row.id);
        })
        
        alarmsEl.appendChild(row);

        hrsInput.value = "";
        minuteInput.value = "";
        secondInput.value="";
        meridiemiInput.value = "";

            }else{
                alert("Please fill all values correctly")
            }
    }else{
        alert("Please fill all values");
    }
}

//function to delete alarm
function deleteAlarm(rowId){
    let rowEl = document.getElementById(rowId);
    if(rowEl){
        rowEl.remove();
    }else{
        console.log("No element found");
    }
}

//Alert on js on alarm Time

function alarmAlert(hrs, min, sec, mer){
    hrs = Number(hrs);
    min = Number(min);
    sec = Number(sec);
    mer = mer.toLowerCase();
    let alarmRingTime = alarmsArray.find((alarm) => {
        return  Number(alarm.hr) == hrs && Number(alarm.min) == min && Number(alarm.sec) == sec;
    })
    if(alarmRingTime){
        alert("Alarm Time")
        console.log("alarm time")
    }
}



