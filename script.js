console.log("Script.js is initialized!");

time();
let currentEditingCard = null;
const alarmSound = document.getElementById("alarmSound");

document.getElementById("addBtn").addEventListener("click", openPopup);
document.getElementById("cancelBtn").addEventListener("click", closePopup);
document.getElementById("alarmForm").addEventListener("submit", addAlarm);
document.getElementById("saveEditBtn").addEventListener("click", saveAlarmChanges);
document.getElementById("cancelEditBtn").addEventListener("click", closeEditPopup);
document.getElementById("stopAlarmBtn").addEventListener("click", stopAlarm);
document.getElementById("snoozeAlarmBtn").addEventListener("click", snoozeAlarm);






function time() {

    let display = document.getElementById("timeDisplay")

    setInterval(() => {

        const date = new Date();

        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");;
        let seconds = String(date.getSeconds()).padStart(2, "0");;

        display.innerText = `${hours}:${minutes}:${seconds}`;

    }, 1000);

    
    
}

setInterval(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const allAlarms = document.querySelectorAll('.alarm-card');

    allAlarms.forEach(card => {
        const time = card.querySelector('.alarm-time span').innerText;
        const label = card.querySelector('.label').innerText;

        // Prevent retrigger
        if (time === currentTime && !card.classList.contains("triggered")) {
            triggerAlarm(label, time);
            card.classList.add("triggered");
        }
    });

}, 1000);


function openPopup() {
    document.getElementById("addAlarmPopup").style.display = "flex";
}
function closePopup() {
    document.getElementById("addAlarmPopup").style.display = "none";
}



function addAlarm(event) {

    event.preventDefault();


    // Getting the values from the inputs
    const labelInp = document.getElementById("alarmLabelInp").value || "Unnamed Alarm";
    const alarmTimeInp = document.getElementById("alarmTimeInp").value;


    const alarmCards = document.getElementById("alarmCards");

    //Alarm Contents 
    const alarmCard = document.createElement('div');
    alarmCard.className = "alarm-card";

    const alarmContents = document.createElement('div');
    alarmContents.className = "alarm-contents";

    const textContent = document.createElement('div');
    textContent.className = "text-content";

    const alarmLabel = document.createElement('div');
    alarmLabel.className = "label";
    alarmLabel.innerText = `${labelInp}`;

    textContent.appendChild(alarmLabel);


    const alarmTime = document.createElement('div');
    alarmTime.className = "alarm-time";

    const timeValue = document.createElement('span');
    timeValue.innerText = `${alarmTimeInp}`;

    alarmTime.appendChild(timeValue);
    textContent.appendChild(alarmTime);
    alarmContents.appendChild(textContent);
    alarmCard.appendChild(alarmContents);


    // Buttons
    const alarmButtons = document.createElement('div');
    alarmButtons.className = "alarm-buttons";

    const editBtnContainer = document.createElement('div');
    editBtnContainer.className = "edit";

    const editButton = document.createElement('button');
    editButton.className = "edit-btn";
    editButton.innerHTML = `<img src="Assets/Icons/pencil-square.svg" alt="">`;

    // Functionality for the editButton
    editButton.addEventListener("click", () => {
        document.getElementById("editAlarmLabel").value = alarmLabel.innerText;
        document.getElementById("editAlarmTime").value = timeValue.innerText;
        document.getElementById("editAlarmPopup").style.display = "flex";

        currentEditingCard = alarmCard;
    })


    editBtnContainer.appendChild(editButton);
    alarmButtons.appendChild(editBtnContainer);


    const deleteBtnContainer = document.createElement('div');
    deleteBtnContainer.className = "delete";

    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-btn";
    deleteButton.innerHTML = `<img src="Assets/Icons/trash3-fill.svg" alt="">`;

    // Functionality for the deleteButton
    deleteButton.addEventListener("click", () => {
        alarmCard.remove();
    })


    deleteBtnContainer.appendChild(deleteButton);
    alarmButtons.appendChild(deleteBtnContainer);

    alarmCard.appendChild(alarmButtons);
    alarmCards.appendChild(alarmCard);


    document.getElementById("alarmForm").reset();
    closePopup();

}


function closeEditPopup() {
    document.getElementById("editAlarmPopup").style.display = "none";
}


function saveAlarmChanges() {
    console.log("SaveAlarmChanges triggered");

    const newLabel = document.getElementById("editAlarmLabel").value;
    const newTime = document.getElementById("editAlarmTime").value;

    if (currentEditingCard) {
        const labelDiv = currentEditingCard.querySelector(".label");
        const timeSpan = currentEditingCard.querySelector(".alarm-time span");

        labelDiv.innerText = newLabel;
        timeSpan.innerText = newTime;
    }

    closeEditPopup();

}

function triggerAlarm(label, time) {
    document.getElementById("activeAlarmLabel").innerText = label;
    document.getElementById("activeAlarmTime").innerText = time;
    document.getElementById("activeAlarmPopup").style.display = "flex";
    alarmSound.play();


}

function stopAlarm() {
    document.getElementById("activeAlarmPopup").style.display = "none";
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

function snoozeAlarm() {
    document.getElementById("activeAlarmPopup").style.display = "none";
    alarmSound.pause();
    alarmSound.currentTime = 0;

    setTimeout(() => {
        triggerAlarm(
            document.getElementById("activeAlarmLabel").innerText,
            document.getElementById("activeAlarmTime").innerText
        );
    }, 1 * 60 * 1000);
}

