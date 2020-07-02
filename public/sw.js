// Step 4 code here //
// try edit the cached files and/or the `cachedFiles` list
const cachedFiles = [
    './res/img/post.svg',
    './res/img/tetto-144x144.png',
    './res/img/tetto-800x800.png',
    './js/home.js',
    './home.html',
    '../image/footer/MainPage.png',
    '../image/footer/Search.png',
    '../image/footer/Category.png',
    '../image/footer/Msg.png',
    '../image/footer/Profile.png',
  ]
  
  // edit this to force re-cache
  const cacheKey = 'tetto-sw-v3'
  
  // install, a good time to preload cache
  self.addEventListener('install', event => {
    console.log(`${cacheKey} is installed`)
    event.waitUntil((async () => {
      const cache = await caches.open(cacheKey)
      return cache.addAll(cachedFiles)
    })())
  })

// Step 5 code here //
// activate, a good time to clean old cache since the old service work stops now
self.addEventListener('activate', event => {
    console.log(`${cacheKey} is activated`)
    event.waitUntil((async () => {
      const keys = await caches.keys()
      return Promise.all(keys.filter(key => key != cacheKey).map(key => caches.delete(key)))
    })())
  })

// Step 6 code here //

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
      const response = await caches.match(event.request)
      if (response) {
        console.log(`Cache fetch: ${event.request.url}`)
        return response
      }
      console.log(`Network fetch: ${event.request.url}`)
      return fetch(event.request)
    })())
  })
