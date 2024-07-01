// import { useState } from 'react'
//
//
//
// export function createLoadingStatus(loading: boolean, label: string) {
//   return {
//     loading,
//     label
//   }
// }
//
//
//
// export type loadingStatus = ReturnType<typeof createLoadingStatus>
//
//
//
// export default function useLoading() {
//   const initialStatus = createLoadingStatus(true, 'Inicializace')
//   const [ status, setStatus ] = useState(initialStatus)
//
//   function applyStatus(): void
//   function applyStatus(status: string): void
//   function applyStatus(status?: string) {
//     setStatus({
//       loading: status !== undefined,
//       label: status ?? ''
//     })
//   }
//
//   return {
//     status,
//     setStatus,
//     applyStatus
//   }
// }



import { useState, useMemo, useEffect } from 'react'
import useLogger from '@hooks/useLogger'



export const taskFactory = () => crypto.randomUUID()

export type task = ReturnType<typeof taskFactory>



export default function useLoading() {
  // helpers
  const { debug } = useLogger('useLoading')



  // state
  const [ tasks, setTasks ] = useState<Array<task>>([])
  const loading = useMemo(() => tasks.length > 0, [ tasks ])

  useEffect(() => {
    debug('useEffect', `Tasks count: ${ tasks.length }`)
  }, [ tasks ])



  // helpers
  function addTask(name: string) {
    debug('addTask', `adding task ${ name }`)
    const newTask = taskFactory()

    setTasks(prev => [ ...prev, newTask ])

    return () => {
      debug('addTask -> {anonymous}', `removing task ${ name }`)
      setTasks(prev => prev.filter(task => task !== newTask))
    }
  }



  return {
    addTask,
    loading
  }
}
