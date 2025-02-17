// 서비스 워커 파일
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("fcm sw activate..");
});
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
  };
  console.log(resultData.title, {
    body: resultData.body,
  });
  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// push 이벤트의 객체가 notificationclick 이벤트 객체에 부모이다.
// 즉, 여기서 notificationclick 이벤트 객체에 값이 전이된다.

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data;
  event.waitUntil(self.clients.openWindow(urlToOpen));
});
