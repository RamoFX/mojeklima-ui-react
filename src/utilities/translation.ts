import { language, fallbackLanguage } from '@contexts/languageContext'



export function getPreferredLanguage() {
  const supported = [ 'en', 'cs', 'de' ]
  const user = navigator.language.slice(0, 2)
  return supported.includes(user)
         ? user as language
         : fallbackLanguage
}
