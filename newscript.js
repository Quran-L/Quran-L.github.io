function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomInt_range(min, max) {
    var minCeiled = Math.ceil(min);
    var maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
var text = "";
var surah_name = "";
var name_eng = "";
var surah_num = 0;
var verse_num = 0;
var verse_max = 0;
var f = "";
var file = "";
function get_surah() {
    var from_surah = document.getElementById("from");
    var to_surah = document.getElementById("to");
    var MAX = 0;
    var MIN = 0;
    if (from_surah && to_surah) {
        MAX = parseInt(to_surah.value);
        MIN = parseInt(from_surah.value);
    }
    if ((MIN < MAX) && (MIN > 0) && (MAX <= 114)) { // Surah must be between [1, 114] inclusive
        var a_1 = getRandomInt_range(MIN - 1, MAX) + 1; // this will get us our random surah
        surah_name = String(a_1);
        file = "https://api.alquran.cloud/v1/ayah/";
        f = "https://api.alquran.cloud/v1/ayah/";
        var first_ayah = "https://api.alquran.cloud/v1/ayah/" + a_1 + ":1";
        fetch(first_ayah)
            .then(function (response) { return response.json(); }) // Parse JSON response
            .then(function (x) {
            // the following variable is the max number of verses in the surah
            verse_max = x.data.surah.numberOfAyahs;
            var b = getRandomInt(verse_max) + 1;
            file = file + a_1 + ":" + b;
            get_ayah(file);
        });
    }
    else if (MAX == MIN) {
        var a_2 = MAX;
        surah_name = String(a_2);
        file = "https://api.alquran.cloud/v1/ayah/";
        f = "https://api.alquran.cloud/v1/ayah/";
        var first_ayah = "https://api.alquran.cloud/v1/ayah/" + a_2 + ":1";
        fetch(first_ayah)
            .then(function (response) { return response.json(); }) // Parse JSON response
            .then(function (x) {
            // the following variable is the max number of verses in the surah
            verse_max = x.data.surah.numberOfAyahs;
            var b = getRandomInt(verse_max) + 1;
            file = file + a_2 + ":" + b;
            get_ayah(file);
        });
    }
}
function get_ayah(file) {
    // Display the specific part in an HTML element
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
        verse_max = x.data.surah.numberOfAyahs;
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
// could refactor this into get_ayah but im too lazy
// also i get to type more typescript (i'm learning typescript and rewriting old js projects in ts)
function get_next() {
    if (verse_num < verse_max) {
        clear_ans();
        var d = verse_num + 1;
        var g = f + surah_num + ":" + d; // file_name + surah_num + : + verse_number
        fetch(g)
            .then(function (response) { return response.json(); }) // Parse JSON response
            .then(function (x) {
            // Access the specific part of the JSON data you want to display
            text = x.data.text;
            surah_name = x.data.surah.name;
            name_eng = x.data.surah.englishName;
            surah_num = x.data.surah.number;
            verse_num = x.data.numberInSurah;
            // the following variable is the max number of verses in the surah
            verse_max = x.data.surah.numberOfAyahs;
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
var answer_button = document.getElementById("answer");
if (answer_button) {
    answer_button.addEventListener("click", get_ans);
}
var my_button = document.getElementById("new_verse");
if (my_button) {
    my_button.addEventListener("click", get_surah);
    my_button.addEventListener("click", clear_ans);
}
var next_button = document.getElementById("next");
if (next_button) {
    next_button.addEventListener("click", get_next);
}
