// import fs from 'fs';
// import fetch from 'node-fetch';

// const langs = [
//   { code: 'si', name: 'Sinhala' },
//   { code: 'ta', name: 'Tamil' }
// ];

// const en = JSON.parse(fs.readFileSync('./src/i18n/en.json', 'utf8'));

// async function translateText(text, targetLang) {
//   try {
//     const res = await fetch('https://libretranslate.com/translate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         q: text,
//         source: 'en',
//         target: targetLang,
//         format: 'text'
//       }),
//     });

//     const data = await res.json();
//     console.log('API response:', data);
//     return data.translatedText || data.translated_text || data.text || 'undefined translation';
//   } catch (error) {
//     console.error('Translation error:', error);
//     return text; // fallback to original
//   }
// }


// async function autoTranslate() {
//   for (let lang of langs) {
//     let result = {};
//     for (let key in en) {
//       const translated = await translateText(en[key], lang.code);
//       result[key] = translated;
//       console.log(`Translated "${key}" to ${lang.name}: ${translated}`);
//     }
//     fs.writeFileSync(`./src/i18n/${lang.code}.json`, JSON.stringify(result, null, 2), 'utf8');
//     console.log(`${lang.name} translation saved.`);
//   }
// }

// autoTranslate();

const fs = require('fs').promises;
const translate = require('@vitalets/google-translate-api');

async function translateText(text, targetLang) {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error(`Translation error for "${text}" to ${targetLang}:`, error);
    return text;
  }
}

async function autoTranslateFile() {
  const enDataRaw = await fs.readFile('src/i18n/en.json', 'utf-8');
  const enData = JSON.parse(enDataRaw);

  const siData = {};
  const taData = {};

  for (const [key, value] of Object.entries(enData)) {
    siData[key] = await translateText(value, 'si');
    console.log(`Translated "${key}" to Sinhala: ${siData[key]}`);

    taData[key] = await translateText(value, 'ta');
    console.log(`Translated "${key}" to Tamil: ${taData[key]}`);
  }

  await fs.writeFile('src/i18n/si.json', JSON.stringify(siData, null, 2), 'utf-8');
  console.log('Sinhala translations saved to si.json');

  await fs.writeFile('src/i18n/ta.json', JSON.stringify(taData, null, 2), 'utf-8');
  console.log('Tamil translations saved to ta.json');
}

autoTranslateFile();
