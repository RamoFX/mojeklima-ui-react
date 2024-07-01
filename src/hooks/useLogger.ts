const manualEnable = false



export default function useLogger(module: string, circleHue?: number) {
  // preparation
  circleHue = circleHue ?? Math.round(Math.random() * 360)



  // helpers
  const dotCss = `color: hsl(${ circleHue }, 100%, 50%)`
  const moduleCss = 'font-weight: bold; font-size: 12px;'
  const memberCss = 'color: #7a7a7a;'



  // main logic
  function debug(member: string, message: string, args: Array<string> = []) {
    if (!manualEnable && process.env.NODE_ENV !== 'development')
      return

    const argsString = args.length === 0 ? '...' : args.join(', ')

    console.log(`%c\u25CF %c${ module }%c ${ member }(${ argsString })%c ${ message }`, dotCss, moduleCss, memberCss, '')
  }



  return {
    debug
  }
}
