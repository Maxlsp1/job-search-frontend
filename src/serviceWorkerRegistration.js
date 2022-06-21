import { Workbox } from 'workbox-window';

export function register(){
  const wb = new Workbox('/sw.js', {})

  wb.addEventListener('activated', event => {
    console.log('registration')
    // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.
    if (!event.isUpdate) {
      // If your service worker is configured to precache assets, those
      // assets should all be available now.
      // So send a message telling the service worker to claim the clients
      // This is the first install, so the functionality of the app
      // should meet the functionality of the service worker!
      wb.messageSW({ type: 'CLIENTS_CLAIM' });
    }
  });
  wb.register()
  return wb
}

export function notification(){

  if ('serviceWorker' in navigator) {
      Notification.requestPermission(permission => {
          if(!('permission' in Notification)) {
              console.log('permission : ', permission)
              Notification.permission = permission;
          }
          return permission;
      })
      .then(() => {
        this.register()
      })
      .catch(console.error);

  } else {
      console.warn('Le navigateur ne prend pas en charge les services workers');
  }  

}

export function checkUpdate(wb){
  setInterval(() => {
    if("serviceWorker" in navigator){
      console.log('update')
      navigator.serviceWorker.getRegistration().then((reg) => {
        reg.onupdatefound = () =>{
          caches.delete()
          window.location.reload()
        }
      })
    }
    wb.update() 
    wb.messageSkipWaiting()
  }, 1 * 1 * 10000);

}