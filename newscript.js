
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomInt_range(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  


let text = "";
let surah_name = "";
let name_eng = "";
let verse_num;
let verse_max;
let surah_num;
let f = "";
let file = "";

function get_surah() {
    let MAX = parseInt(document.getElementById("to").value);
    let MIN = parseInt(document.getElementById("from").value);
    if ((MIN < MAX) && (MIN > 0) && (MAX <= 114)) {
        let a = getRandomInt_range(MIN - 1, MAX) + 1; // this will get us our random surah
        surah_name = a;
        file = "https://api.alquran.cloud/v1/ayah/";
        f = "https://api.alquran.cloud/v1/ayah/";
        let first_ayah = "https://api.alquran.cloud/v1/ayah/" + a + ":1";
    
        fetch(first_ayah)
        .then(response => response.json()) // Parse JSON response
        .then(x => {
        
        // the following variable is the max number of verses in the surah
        verse_max = x.data.surah.numberOfAyahs;
    
        let b = getRandomInt(verse_max) + 1;
        file = file + a + ":" + b;
    
        get_ayah(file);
        })
    } else if (MAX == MIN) {
        let a = MAX;
        surah_name = a;
        file = "https://api.alquran.cloud/v1/ayah/";
        f = "https://api.alquran.cloud/v1/ayah/";
        let first_ayah = "https://api.alquran.cloud/v1/ayah/" + a + ":1";
    
        fetch(first_ayah)
        .then(response => response.json()) // Parse JSON response
        .then(x => {
        
        // the following variable is the max number of verses in the surah
        verse_max = x.data.surah.numberOfAyahs;
    
        let b = getRandomInt(verse_max) + 1;
        file = file + a + ":" + b;
    
        get_ayah(file);
        })
    }

}

function get_ayah(file) {
      // Display the specific part in an HTML element
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

function get_next() {
    if (verse_num < verse_max) {
        clear_ans();
        let d = verse_num + 1;
        let g = f + surah_num + ":" + d;
        fetch(g)
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
my_button.addEventListener("click", get_surah);
my_button.addEventListener("click", clear_ans);

let next_button = document.getElementById("next");
next_button.addEventListener("click", get_next);
