import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">{t('welcome')}</h1>
        <p className="text-gray-600 text-center mb-8">{t('description')}</p>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={() => changeLanguage('en')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <span className="mr-2">🇬🇧</span>
            English
          </button>
          
          <button 
            onClick={() => changeLanguage('si')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <span className="mr-2">🇱🇰</span>
            සිංහල
          </button>
          
          <button 
            onClick={() => changeLanguage('ta')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <span className="mr-2">🇱🇰</span>
            தமிழ்
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            {t('select_language')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;