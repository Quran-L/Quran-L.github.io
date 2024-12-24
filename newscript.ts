
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function getRandomInt_range(min: number, max: number): number {
    const minCeiled: number = Math.ceil(min);
    const maxFloored: number = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  

let text: string = "";
let surah_name: string = "";
let name_eng: string = "";
let surah_num: number = 0;
let verse_num: number = 0;
let verse_max: number = 0;
let f: string = "";
let file: string = "";

// Typescript interface (that works with the api)
interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface ApiResponse {
  code: number;
  status: string;
  data: {
      number: number;
      text: string;
      edition: Edition;
      surah: Surah;
      numberInSurah: number;
      juz: number;
      manzil: number;
      page: number;
      ruku: number;
      hizbQuarter: number;
      sajda: boolean;
  };
}


function get_surah(): void {
    const from_surah = document.getElementById("from") as HTMLInputElement;
    const to_surah = document.getElementById("to") as HTMLInputElement;
    let MAX: number = 0;
    let MIN: number = 0;
    if (from_surah && to_surah) {
      MAX = parseInt(to_surah.value);
      MIN = parseInt(from_surah.value);
    }
    if ((MIN < MAX) && (MIN > 0) && (MAX <= 114)) { // Surah must be between [1, 114] inclusive
        let a: number = getRandomInt_range(MIN - 1, MAX) + 1; // this will get us our random surah
        surah_name = String(a);
        file = "https://api.alquran.cloud/v1/ayah/";
        f = "https://api.alquran.cloud/v1/ayah/";
        let first_ayah: string = "https://api.alquran.cloud/v1/ayah/" + a + ":1";
    
        fetch(first_ayah)
        .then((response: Response) => response.json()) // Parse JSON response
        .then((x: ApiResponse) => {
          // the following variable is the max number of verses in the surah
          verse_max = x.data.surah.numberOfAyahs;
          let b = getRandomInt(verse_max) + 1;
          file = file + a + ":" + b;
          get_ayah(file);
        })
    } else if (MAX == MIN) {
        let a = MAX;
        surah_name = String(a);
        file = "https://api.alquran.cloud/v1/ayah/";
        f = "https://api.alquran.cloud/v1/ayah/";
        let first_ayah = "https://api.alquran.cloud/v1/ayah/" + a + ":1";
    
        fetch(first_ayah)
        .then((response: Response) => response.json()) // Parse JSON response
        .then((x: ApiResponse) => {
          // the following variable is the max number of verses in the surah
          verse_max = x.data.surah.numberOfAyahs;
          let b = getRandomInt(verse_max) + 1;
          file = file + a + ":" + b;
          get_ayah(file);
        })
    }
}

function get_ayah(file: string): void {
      // Display the specific part in an HTML element
      fetch(file)
      .then((response: Response) => response.json()) // Parse JSON response
      .then((x: ApiResponse) => {
        // Access the specific part of the JSON data you want to display
        text = x.data.text;
       
        surah_name = x.data.surah.name;
        name_eng = x.data.surah.englishName;
        surah_num = x.data.surah.number;
        verse_num = x.data.numberInSurah;
        // the following variable is the max number of verses in the surah
        verse_max = x.data.surah.numberOfAyahs;
      

        // Display the specific part in an HTML element
        const v: HTMLElement | null = document.getElementById("verse");
        if (v) {
          v.innerHTML = text;
        }
      })
      
      .catch(error => {
      console.error("Error fetching data:", error);
      })
}

// could refactor this into get_ayah but im too lazy
// also i get to type more typescript (i'm learning typescript and rewriting old js projects in ts)
function get_next(): void {
    if (verse_num < verse_max) {
        clear_ans();
        let d: number = verse_num + 1;
        let g: string = f + surah_num + ":" + d; // file_name + surah_num + : + verse_number
        fetch(g)
        .then((response: Response) => response.json()) // Parse JSON response
        .then((x: ApiResponse) => {
          // Access the specific part of the JSON data you want to display
          text = x.data.text;
         
          surah_name = x.data.surah.name;
          name_eng = x.data.surah.englishName;
          surah_num = x.data.surah.number;
          verse_num = x.data.numberInSurah;
          // the following variable is the max number of verses in the surah
          verse_max = x.data.surah.numberOfAyahs;
        
    
          // Display the specific part in an HTML element
          const v: HTMLElement | null = document.getElementById("verse");
          if (v) {
            v.innerHTML = text;
          }
        })
        
        .catch(error => {
        console.error("Error fetching data:", error);
        })
    }
}

function clear_ans(): void {
  const ans1: HTMLElement | null = document.getElementById("ans1");
  const ans2: HTMLElement | null = document.getElementById("ans2");
  if (ans1 && ans2) {
      ans1.innerHTML = "";
      ans2.innerHTML = "";
  }
}

function get_ans(): void {
    let res: string = name_eng + "  ---  " + surah_name;
    const ans1: HTMLElement | null = document.getElementById("ans1");
    const ans2: HTMLElement | null = document.getElementById("ans2");
    if (ans1 && ans2) {
      ans1.innerHTML = res;
      ans2.innerHTML = "Verse : " + verse_num;
    }
}

let answer_button: HTMLElement | null = document.getElementById("answer");
if (answer_button) {
  answer_button.addEventListener("click", get_ans);
}


let my_button: HTMLElement | null = document.getElementById("new_verse");
if (my_button) {
  my_button.addEventListener("click", get_surah);
  my_button.addEventListener("click", clear_ans);
}

let next_button: HTMLElement | null = document.getElementById("next");
if (next_button) {
  next_button.addEventListener("click", get_next);
}

