
function getRandomInt(max: number) : number {
    return Math.floor(Math.random() * max);
}

let MAX: number = 6236 // MAX NUMBER OF VERSES IN API

let text: string = "";
let surah_name: string = "";
let name_eng: string = "";
let surah_num: number = 0;
let verse_num: number = 0;
let surah_max: number = 0;

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

function get_ayah() : void {
    let a: number = getRandomInt(MAX) + 1;
    let file: string = "https://api.alquran.cloud/v1/ayah/" + a;

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
      surah_max = x.data.surah.numberOfAyahs;
    

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

///
let answer_button: HTMLElement | null = document.getElementById("answer");

if (answer_button) {
  answer_button.addEventListener("click", get_ans);
}


let my_button: HTMLElement | null = document.getElementById("new_verse");
if (my_button) {
  my_button.addEventListener("click", get_ayah);
  my_button.addEventListener("click", clear_ans);
}


