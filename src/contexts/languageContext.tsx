import React, { createContext, FC, useContext, ReactNode, useState, useEffect } from 'react'
import { Modal, Menu } from 'react-daisyui'
import { useLocalStorage } from 'react-use'
import translations from '@root/languages/translations'
import { getPreferredLanguage } from '@utilities/translation'



const LanguageContext = createContext<ReturnType<typeof useLanguage> | null>(null)



interface LanguageProviderProps {
  children: ReactNode
}



export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const language = useLanguage()

  return (
    <LanguageContext.Provider value={ language }>
      { children }

      <Modal className='language-selector w-64' open={ language.modalOpened } onClickBackdrop={ language.closeModal }>
        <Modal.Header className='flex flex-col items-center gap-12 font-bold text-center'>
          { translations.chooseLanguage[language.language] }
        </Modal.Header>

        <Modal.Body className='text-center font-medium'>
          <Menu className='rounded-box p-2 gap-2'>

            <Menu.Item onClick={ () => language.selectLanguage('cs') }>
              <button color='ghost' className='flex justify-center'>
                Český
              </button>
            </Menu.Item>

            <Menu.Item onClick={ () => language.selectLanguage('en') }>
              <button color='ghost' className='flex justify-center'>
                English
              </button>
            </Menu.Item>

            <Menu.Item onClick={ () => language.selectLanguage('de') }>
              <button color='ghost' className='flex justify-center'>
                Deutsch
              </button>
            </Menu.Item>

          </Menu>
        </Modal.Body>
      </Modal>
    </LanguageContext.Provider>
  )
}



export default function useLanguageContext() {
  const context = useContext(LanguageContext)

  if (context === null) {
    throw new Error('"useLanguageContext" should be used within <LanguageProvider/>.')
  }

  return context
}



export type language = 'cs' | 'en' | 'de'
export const fallbackLanguage = 'cs'



function useLanguage() {
  // language logic
  const [ language, setLanguage ] = useLocalStorage<language>('language')
  const [ preferredLanguage, setPreferredLanguage ] = useState<language>()

  useEffect(() => {
    // get preferred language
    const preferred = getPreferredLanguage()
    setPreferredLanguage(preferred)

    // ask for language if wasn't set yet
    if (!language)
      openModal()
  }, [])



  // modal
  const [ modalOpened, setModalOpened ] = useState(false)

  function selectLanguage(language: language) {
    setLanguage(language)

    closeModal()
  }

  function openModal() {
    setModalOpened(true)
  }

  function closeModal() {
    setModalOpened(false)
  }



  return {
    openModal,
    closeModal,
    modalOpened,
    selectLanguage,
    language: language ?? preferredLanguage ?? fallbackLanguage
  }
}

