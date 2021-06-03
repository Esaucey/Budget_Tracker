if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then((reg) => 
    console.log('service worker registered', reg))
    .catch((err) =>
    console.log('service worker not registered', err))
    // window.addEventListener("load", () => {
    //     navigator.serviceWorker.register("/service-worker.js").then(reg => {
    //       console.log("We found your service worker file!", reg);
    //     });
    //   });
}