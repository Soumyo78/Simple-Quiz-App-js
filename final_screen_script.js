let your_final_marks = localStorage.getItem("finalMarks");
let full_marks = localStorage.getItem("fullMarks");
let name = localStorage.getItem("name");

function close_window(){
    if(confirm("Are you sure you want to exit ?")){
        window.close();
    }
}

function restart(){
    if(confirm("Are you sure you want to restart the quiz ?")){
        window.location.replace("index.html");
    }
}

document.getElementById('name-text').innerHTML = `Hello, ${name}`
document.getElementById('final-marks-text').innerHTML = `You have scored ${your_final_marks} out of ${full_marks}.`

document.getElementById('retry-btn').addEventListener("click", () =>{
    restart();
})

document.getElementById('exit-btn').addEventListener("click", () =>{
    close_window();
})
