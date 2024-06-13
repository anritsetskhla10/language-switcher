i18next
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: {
      escapeValue: false
    }
  }, function(err, t) {
    if (err) return console.error(err);
    updateContent();
    bindLanguageMenu();
  });

function updateContent() {
  document.getElementById('welcome').innerHTML = i18next.t('welcome');
  document.getElementById('description').innerHTML = i18next.t('description');
}

function changeLanguage(lang, flag, langText) {
  i18next.changeLanguage(lang, () => {
    updateContent();
    updateSelectedLangDisplay(flag, langText);
    hideLanguageOptions();
  });
}

function updateSelectedLangDisplay(flag, langText) {
  document.getElementById('selected-flag').src = flag;
  document.getElementById('selected-lang-text').textContent = langText;
}

function bindLanguageMenu() {
  const links = document.querySelectorAll('a.lang-link');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const lang = this.getAttribute('data-lang');
      const flag = this.getAttribute('data-flag');
      const langText = this.getAttribute('data-lang-text');
      changeLanguage(lang, flag, langText);
    });
  });

  document.getElementById('selected-lang').addEventListener('click', function() {
    document.querySelector('.lang-menu').classList.toggle('show-options');
  });
}

function hideLanguageOptions() {
  document.querySelector('.lang-menu').classList.remove('show-options');
}