const selectLang = document.querySelectorAll("select");
const btnTranslate = document.querySelector(".btn-translate");
const fromTextInput = document.querySelector(".from-text");
const toTextInput = document.querySelector(".to-text");
const exchangeEl = document.querySelector(".exchange ");
const icons = document.querySelectorAll(".row i");

selectLang.forEach((lang, id) => {
  for (const country_code in countries) {
    let selected;

    if (id === 0 && country_code === "en-GB") {
      selected = "selected";
    } else if (id === 1 && country_code === "hi-IN") {
      selected = "selected";
    }

    let html = `<option value="${country_code}" ${
      selected === "selected" ? selected : ""
    }>${countries[country_code]}</option>`;

    lang.insertAdjacentHTML("afterbegin", html);
  }
});

btnTranslate.addEventListener("click", function () {
  let text = fromTextInput.value;
  let translateFrom = selectLang[0].value;
  let translateTo = selectLang[1].value;

  if (!text) return;
  toTextInput.setAttribute("placeholder", "Translating...");

  let apiURL = `https://api.mymemory.translated.net/get?q=${text}}&langpair=${translateFrom}|${translateTo}`;

  // fetching api response and trueing it with parsing into JS object and in another then method receiving that object
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      const { translatedText } = data.responseData;

      toTextInput.textContent = translatedText;
      toTextInput.setAttribute("placeholder", "Translation");
    });
});

exchangeEl.addEventListener("click", function () {
  let temptext = fromTextInput.value;
  fromTextInput.value = toTextInput.value;
  toTextInput.value = temptext;

  let temptag = selectLang[0].value;
  selectLang[0].value = selectLang[1].value;
  selectLang[1].value = temptag;
});

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-copy")) {
      if (e.target.id === "from") {
        navigator.clipboard.writeText(fromTextInput.value);
      } else if (e.target.id === "to") {
        navigator.clipboard.writeText(toTextInput.value);
      }
    } else {
      let uttrance;
      if (e.target.id === "from") {
        uttrance = new SpeechSynthesisUtterance(fromTextInput.value);
        uttrance.lang = selectLang[0].value;
      } else if (e.target.id === "to") {
        uttrance = new SpeechSynthesisUtterance(toTextInput.value);
        uttrance.lang = selectLang[1].value;
      }
      speechSynthesis.speak(uttrance);
    }
  });
});
