function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var MAX = 6236; // MAX NUMBER OF VERSES IN API
var text = "";
var surah_name = "";
var name_eng = "";
var surah_num = 0;
var verse_num = 0;
var surah_max = 0;
function get_ayah() {
    var a = getRandomInt(MAX) + 1;
    var file = "https://api.alquran.cloud/v1/ayah/" + a;
    fetch(file)
        .then(function (response) { return response.json(); }) // Parse JSON response
        .then(function (x) {
        // Access the specific part of the JSON data you want to display
        text = x.data.text;
        surah_name = x.data.surah.name;
        name_eng = x.data.surah.englishName;
        surah_num = x.data.surah.number;
        verse_num = x.data.numberInSurah;
        // the following variable is the max number of verses in the surah
        surah_max = x.data.surah.numberOfAyahs;
        // Display the specific part in an HTML element
        var v = document.getElementById("verse");
        if (v) {
            v.innerHTML = text;
        }
    })
        .catch(function (error) {
        console.error("Error fetching data:", error);
    });
}
function clear_ans() {
    var ans1 = document.getElementById("ans1");
    var ans2 = document.getElementById("ans2");
    if (ans1 && ans2) {
        ans1.innerHTML = "";
        ans2.innerHTML = "";
    }
}
function get_ans() {
    var res = name_eng + "  ---  " + surah_name;
    var ans1 = document.getElementById("ans1");
    var ans2 = document.getElementById("ans2");
    if (ans1 && ans2) {
        ans1.innerHTML = res;
        ans2.innerHTML = "Verse : " + verse_num;
    }
}
///
var answer_button = document.getElementById("answer");
if (answer_button) {
    answer_button.addEventListener("click", get_ans);
}
var my_button = document.getElementById("new_verse");
if (my_button) {
    my_button.addEventListener("click", get_ayah);
    my_button.addEventListener("click", clear_ans);
}
