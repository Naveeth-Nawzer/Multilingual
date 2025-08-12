import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('si')}>සිංහල</button>
      <button onClick={() => changeLanguage('ta')}>தமிழ்</button>

      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

export default App;
