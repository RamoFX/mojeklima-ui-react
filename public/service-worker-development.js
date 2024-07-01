/* eslint-disable no-restricted-globals */



// skip waiting
// Usage: registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})



// handle push notifications
self.addEventListener('push', event => {
  if (!event || !event.data)
    return

  const { data, body, title } = event.data.json()

  self.registration.showNotification(title, {
    data,
    body,
    icon: 'https://home.spsostrov.cz/~dvorro2/dmp/frontend/icons/common/logo512.png?last-update=05.04.2023_18:10:30',
    badge: 'https://home.spsostrov.cz/~dvorro2/dmp/frontend/icons/common/logo512.png?last-update=05.04.2023_18:10:30'
  })
})



// handle push notification open
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow('/~dvorro2/dmp/frontend/notifications'))
})
