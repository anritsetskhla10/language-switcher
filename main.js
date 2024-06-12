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
        updateContent();
      });

    function updateContent() {
      document.getElementById('welcome').innerHTML = i18next.t('welcome');
      document.getElementById('description').innerHTML = i18next.t('description');
    }

    function changeLanguage(lang) {
      i18next.changeLanguage(lang, () => {
        updateContent();
      });
    }