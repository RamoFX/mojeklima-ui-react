export const classes = (...classNames: Array<string | null>) => classNames.filter(Boolean)
                                                                          .join(' ')

export function initialsFromName(name: string, lettersCount: number): string {
  return name.split(' ')
             .map(partOfName => partOfName[0].trim())
             .filter(letter => /\w/.test(letter))
             .filter((_, idx) => idx < lettersCount)
             .join('')
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((
                               4 - base64String.length % 4
                             ) % 4)
  const base64 = (
    base64String + padding
  )
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray

  // const binary_string = window.atob(base64String)
  // const len = binary_string.length
  // const bytes = new Uint8Array(len)
  // for (let i = 0; i < len; i++) {
  //   bytes[i] = binary_string.charCodeAt(i)
  // }
  // return bytes.buffer
}

export function emptyFunction() {
  return () => {}
}
