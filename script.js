
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let MAX = 6236 // MAX NUMBER OF VERSES IN API

let text = "";
let surah_name = "";
let name_eng = "";
let surah_num = "";
let verse_num = "";

function get_ayah() {
    let a = getRandomInt(MAX) + 1;
    let file = "https://api.alquran.cloud/v1/ayah/" + a;

    fetch(file)
    .then(response => response.json()) // Parse JSON response
    .then(x => {
  // Access the specific part of the JSON data you want to display
    text = x.data.text;
     
    surah_name = x.data.surah.name;
    name_eng = x.data.surah.englishName;
    surah_num = x.data.surah.number;
    verse_num = x.data.numberInSurah;
    // the following variable is the max number of verses in the surah
    surah_max = x.data.surah.numberOfAyahs;
    

  // Display the specific part in an HTML element
    document.getElementById("verse").innerHTML = text;
    })
    
    .catch(error => {
    console.error("Error fetching data:", error);
    })
}

function clear_ans() {
    document.getElementById("ans1").innerHTML = "";
    document.getElementById("ans2").innerHTML = "";
}

function get_ans() {
    let res = name_eng + "  ---  " + surah_name;
    document.getElementById("ans1").innerHTML = res;
    document.getElementById("ans2").innerHTML = "Verse : " + verse_num;
}

let answer_button = document.getElementById("answer");
answer_button.addEventListener("click", get_ans);

let my_button = document.getElementById("new_verse");
my_button.addEventListener("click", get_ayah);
my_button.addEventListener("click", clear_ans);