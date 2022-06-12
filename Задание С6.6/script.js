const webUrl = 'wss://echo-ws-service.herokuapp.com';

const btn = document.querySelector('.button');
const geo = document.querySelector('.geo');
const win = document.querySelector('.window');
const input = document.querySelector('.input');

let websocket = new WebSocket(webUrl);

function writeToWindow(message) {
   let txt = document.createElement('p');
   txt.innerHTML = message;
   txt.style.wordWrap = "break-word";
   win.appendChild(txt);
}

geo.addEventListener('click', () => {
  const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  let ref = document.createElement('a')
  ref.href = 'https://www.openstreetmap.org/#map=18/' + latitude + '/' + longitude;
  websocket.send('https://www.openstreetmap.org/#map=18/' + latitude + '/' + longitude);
  websocket.onmessage = function(event) {console.log(event.data)};
  ref.classList.add("user");
  ref.textContent = 'Ссылка на карту';
  win.appendChild(ref);
}

  const error = () => {
  writeToWindow('Невозможно получить ваше местоположение');
}

  if (!navigator.geolocation) {
    writeToWindow('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

btn.addEventListener('click', () => {
  let msg = input.value;
  writeToWindow('<span class="user">' + msg + '</span>');
  websocket.send(msg);
  websocket.onmessage = function(event) {
  writeToWindow('<span class="answer">' + event.data + '</span>');
  };
});
