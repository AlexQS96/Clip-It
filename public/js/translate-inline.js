let currentLang = ""

if (Array.isArray(translateOptions) && translateOptions.length > 1) {
  // Translate the page language when the page is loaded or set the defaultLanguage on localStorage
  if (localStorage.lang && translateOptions.includes(localStorage.lang)) {
    translateTags(localStorage.lang);
    currentLang = localStorage.lang
  } else {
    localStorage.lang = translateOptions[0];
    currentLang = localStorage.lang
  }

  /**
   * Switch for single translation
   * if the default language is english then it will translate: english, spanish
   */

  function singleTranslation() {
    try {
      if (localStorage.lang) {
        localStorage.lang =
          localStorage.lang === translateOptions[0]
            ? translateOptions[1]
            : translateOptions[0];
        translateTags(localStorage.lang);
        currentLang = localStorage.lang
      }
    } catch (error) {
      console.error(
        "ERROR: Oops something happened with the translations setup - singleTranslation",
      );
    }
  }

  if (document.querySelector("#singleTranslation")) {
    document
      .querySelector("#singleTranslation")
      .addEventListener("click", singleTranslation);
  }

  /**
   * Switch for multiple translation
   * translate more than 1 languages declared in the languages variable
   * @param {string} option language to be selected
   */

  function multipleTranslation(option) {
    try {
      if (translateOptions.includes(option)) {
        localStorage.lang = option;
        translateTags(option);
        currentLang = option
      }
    } catch (error) {
      console.error(
        "ERROR: Oops something happened in multipleTranslation\n" + error
      );
    }

    return null;
  }

  if (document.querySelector("#multipleTranslation")) {
    document
      .querySelector("#multipleTranslation")
      .addEventListener("change", function () {
        multipleTranslation(this.value);
      });
  }

  /**
   * Translator for html tags
   * @param {string} lang language selected
   * @param {boolean} single changes singleTranslation button lang indicator
   * @returns translated tags based on its data attribute content and the language chosen
   */

  function translateTags(lang) {
    try {
      if (document.querySelector("#currentLanguage")) {
        document.querySelector("#currentLanguage").textContent = lang;
      }

      if (document.querySelector("#multipleTranslation")) {
        document.querySelector("#multipleTranslation").value = lang;
      }

      if (
        document.querySelectorAll(`[data-${translateOptions[0]}]`).length &&
        lang
      ) {
        for (const htmlTagFound of document.querySelectorAll(`[data-${lang}]`)) {
          htmlTagFound.textContent = htmlTagFound.getAttribute(`data-${lang}`);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        "ERROR: Oops something happened with the translations setup - translateTags",
      );
      console.error(error);
    }
  }
} else {
  console.error(`Oops you forgot to add the translateOptions var into your head script.

here is a template example

remember that requires atleast 2 languages including your defaultLanguage that must be placed in the first position

const translateOptions = ["es", "en", "pt", "fr"];

`);
}