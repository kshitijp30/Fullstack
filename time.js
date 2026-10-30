let inputmin = prompt("Enter the number of minutes for the countdown timer:");  
let time = inputmin * 60;

const timer = setInterval(()=>{
    if (time <= 0) {
        clearInterval(timer);
        return;
    }

    time--;
    update();
},1000);

function update(){
    let min = Math.floor(time / 60);
    let secs = time % 60;

    document.getElementById('min').innerText = min;
    document.getElementById('sec').innerText = (secs<10 ? '0' : '') + secs;

}
update();
