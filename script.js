window.onbeforeunload = function(event) {
    return confirm("Confirm refresh");
};

let qns_ans_arr = [
    {question: "1. What is part of a database that holds only one type of information?", answer:"Field"},
    {question: "2. 'OS' computer abbreviation usually means ?", answer: "Operating System"},
    {question: "3. '.MOV' extension refers usually to what kind of file?", answer: "Animation/movie file"},
    {question: "4. Most modern TV's draw power even if turned off. The circuit the power is used in does what function?", answer: "Remote control"},
    {question: "5. Which is a type of Electrically-Erasable Programmable Read-Only Memory?", answer: "Flash"},
    {question: "6. '.MPG' extension refers usually to what kind of file?", answer: "Animation/movie file"},
    {question: "7. Who is largely responsible for breaking the German Enigma codes, created a test that provided a foundation for artificial intelligence?", answer: "Alan Turing"},
    {question: "8. '.INI' extension refers usually to what kind of file?", answer: "System file"},
    {question: "9. 'DB' computer abbreviation usually means ?", answer: "Database"},
    {question: "10. What do we call a network whose elements may be separated by some distance? It usually involves two or more small networks and dedicated high-speed telephone lines.", answer: "WAN (Wide Area Network)"}
];

let radio_options_arr = [
    {option1: "Record", option2: "Field", option3: "File"},
    {option1: "Operating System", option2: "Open Software", option3: "Optical Sensor"},
    {option1: "Audio file", option2: "MS Office document", option3: "Animation/movie file"},
    {option1: "High voltage", option2: "Sound", option3: "Remote control"},
    {option1: "Flash", option2: "FRAM", option3: "Flange"},
    {option1: "Image file", option2: "Animation/movie file", option3: "WordPerfect Document file"},
    {option1: "Charles Babbage", option2: "Alan Turing", option3: "Jeff Bezos"},
    {option1: "System file", option2: "Image file", option3: "Image Color Matching Profile file"},
    {option1: "Double Byte", option2: "Driver Boot", option3: "Database"},
    {option1: "World Wide Web", option2: "WAN (Wide Area Network)", option3: "URL (Universal Resource Locator)"}
];

let name = null;
function onload_qns(){
    name = prompt("Enter your name bellow : ");
    for(let qns in qns_ans_arr){
        first_qn = qns_ans_arr[qns].question;
        document.getElementById('qns').innerHTML = first_qn;
        break;
    }

    for(let ans in radio_options_arr){
        ans_op1 = radio_options_arr[ans].option1;
        ans_op2 = radio_options_arr[ans].option2;
        ans_op3 = radio_options_arr[ans].option3;
        
        document.getElementById('ans-1').innerHTML = ans_op1;
        document.getElementById('ans-2').innerHTML = ans_op2;
        document.getElementById('ans-3').innerHTML = ans_op3;
        break;
    }
    document.getElementById('nxt-btn').disabled = true;
    document.getElementById('conf-btn').disabled = true;
    document.getElementById('name-text').innerHTML = `Hello, ${name}`;

    if((name == null) || (name == "") ){
        alert("Please enter your name to start the quiz !");
        window.location.reload(true);
    }
}

function onRadioClicked(){
    document.getElementById('nxt-btn').disabled = false;
}

let selectedAns = null;
function reloadRadioBtns(qnsCount){
    if(document.getElementById('ans-1-radio').checked){
        selectedAns = radio_options_arr[qnsCount].option1;
        document.getElementById('ans-1-radio').checked = false;
    }
    else if(document.getElementById('ans-2-radio').checked){
        selectedAns = radio_options_arr[qnsCount].option2;
        document.getElementById('ans-2-radio').checked = false;
    }
    else if(document.getElementById('ans-3-radio').checked){
        selectedAns = radio_options_arr[qnsCount].option3;
        document.getElementById('ans-3-radio').checked = false;
    }
    return selectedAns;
}

function checkFinalAnswer(qnsCount){
    if(document.getElementById('ans-1-radio').checked){
        selectedAns = radio_options_arr[qnsCount].option1;
    }
    else if(document.getElementById('ans-2-radio').checked){
        selectedAns = radio_options_arr[qnsCount].option2;
    }
    else if(document.getElementById('ans-3-radio').checked){
        selectedAns = radio_options_arr[qnsCount].option3;
    }
    return selectedAns;
}

let marks = 0;
function checkAnswer(sel_ans, count){
    corr_ans = qns_ans_arr[count].answer;
    if(sel_ans == corr_ans){
        marks += 10;
        document.getElementById('your-marks-text').innerHTML = `Your Marks: ${marks}`;
    }
    return marks;
}

let qns_count = 0;
document.getElementById('nxt-btn').addEventListener("click", () =>{
    document.getElementById('nxt-btn').disabled = true;
    if(qns_count<qns_ans_arr.length-1){
        qns_count += 1;
        qns_corr_count = qns_count - 1;
        nxt_qn = qns_ans_arr[qns_count].question;
        op1 = radio_options_arr[qns_count].option1;
        op2 = radio_options_arr[qns_count].option2;
        op3 = radio_options_arr[qns_count].option3;
    
        document.getElementById('qns').innerHTML = nxt_qn;
        document.getElementById('ans-1').innerHTML = op1;
        document.getElementById('ans-2').innerHTML = op2;
        document.getElementById('ans-3').innerHTML = op3;
        reloadRadioBtns(qns_corr_count);
        checkAnswer(selectedAns, qns_corr_count);
        return qns_count;
    }
    else if(qns_count == qns_ans_arr.length-1){
        qns_count += 1;
        qns_corr_count = qns_count - 1;
        checkFinalAnswer(qns_corr_count);
        checkAnswer(selectedAns, qns_corr_count);
        alert(`Congratulations ${name} !, you have completed the quiz. Now click the '✔ Submit' button to finish and submit.`)
        document.getElementById('conf-btn').disabled = false;
    }  
})

document.getElementById('conf-btn').addEventListener("click", () =>{
    console.log(marks);
    let final_marks = marks;
    let full_marks = qns_ans_arr.length * 10;
    localStorage.setItem("finalMarks", final_marks);
    localStorage.setItem("fullMarks", full_marks);
    localStorage.setItem("name", name);
    window.location.replace("final_screen.html");
    // window.open("final_screen.html");
})
