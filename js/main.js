

var btn = document.getElementById("btn")
btn.addEventListener("click", getGeolocation);


function getGeolocation() {

  var e = document.getElementById("location");
  var x = document.getElementById("date");
  console.log(x);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  else {
    x.innerHTML = "Seu browser não suporta Geolocalização.";
  };

  function showPosition(pos) {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    var url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
    fetchApi(url);
  };

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        e.innerHTML = "ERRO!"
        x.innerHTML = "Usuário rejeitou a solicitação de Geolocalização."
        break;
      case error.POSITION_UNAVAILABLE:
        e.innerHTML = "ERRO!"
        x.innerHTML = "Localização indisponível."
        break;
      case error.TIMEOUT:
        e.innerHTML = "ERRO!"
        x.innerHTML = "A requisição expirou."
        break;
      case error.UNKNOWN_ERROR:
        e.innerHTML = "ERRO!"
        x.innerHTML = "Algum erro desconhecido aconteceu."
        break;
    }
  };

};



function fetchApi(url) {
  let location = document.getElementById('location');
  let dateview = document.getElementById('date');
  let temp = document.getElementById('temp');
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data)

      var tempCF =
        Math.round(data.main.temp_max) +
        "ºC | " +
        Math.round(Math.round(data.main.temp_max) * 1.8 + 32) +
        "ºF";
      location.innerText = data.name.toUpperCase();
      console.log(data.main.name)

      if (Math.round(data.main.temp_max) > 25) {
        document.getElementById("canvas--fire").hidden = false;
        document.getElementById("canvas--normal").hidden = true;
        document.getElementById("canvas--cold").hidden = true;
      }
      else {
        if (Math.round(data.main.temp_max) > 18) {
          document.getElementById("canvas--fire").hidden = true;
          document.getElementById("canvas--normal").hidden = false;
          document.getElementById("canvas--cold").hidden = true;
        } else {
          document.getElementById("canvas--fire").hidden = true;
          document.getElementById("canvas--normal").hidden = true;
          document.getElementById("canvas--cold").hidden = false;
        }
      };

      temp.innerText = tempCF;

      var date = new Date();

      var months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ];

      var weekday = new Array(7);
      weekday[0] = "Domingo";
      weekday[1] = "Segunda";
      weekday[2] = "Terça";
      weekday[3] = "Quarta";
      weekday[4] = "Quinta";
      weekday[5] = "Sexta";
      weekday[6] = "Sabádo";


      var minutes =
        date.getMinutes() < 11 ? "0" + date.getMinutes() : date.getMinutes();
      var date =
        weekday[date.getDay()].toUpperCase() +
        " | " +
        months[date.getMonth()].toUpperCase().substring(0, 3) +
        " " +
        date.getDate() +
        " | " +
        date.getHours() +
        ":" +
        minutes;

      console.log(date)

      dateview.innerText = date;


    });

};



var pincel = document.getElementById('canvas--fire').getContext('2d');
pincel.beginPath();
pincel.arc(75, 75, 50, 0, Math.PI * 2, true); // Rosto
pincel.fillStyle = 'yellow';
pincel.fill();
pincel.moveTo(110, 75);
pincel.arc(75, 75, 35, 0, Math.PI, false); // Boca
pincel.moveTo(65, 65);
pincel.arc(60, 65, 5, 0, Math.PI * 2, true); // olho esquerdo
pincel.moveTo(95, 65);
pincel.arc(90, 65, 5, 0, Math.PI * 2, true); // Olho direito
pincel.stroke();

var pincel = document.getElementById('canvas--normal').getContext('2d');
pincel.beginPath();
pincel.arc(75, 75, 50, 0, Math.PI * 2, true); // Rosto
pincel.fillStyle = 'yellow';
pincel.fill();
pincel.moveTo(50, 90);
pincel.arc(100, 90, 0, 0, Math.PI, true); // Boca
pincel.moveTo(65, 65);
pincel.arc(60, 65, 5, 0, Math.PI * 2, true); // olho esquerdo
pincel.moveTo(95, 65);
pincel.arc(90, 65, 5, 0, Math.PI * 2, true); // Olho direito
pincel.stroke();

var pincel = document.getElementById('canvas--cold').getContext('2d');
pincel.beginPath();
pincel.arc(75, 75, 50, 0, Math.PI * 2, true); // Rosto
pincel.fillStyle = 'yellow';
pincel.fill();
pincel.moveTo(100, 110);
pincel.arc(75, 110, 25, 0, Math.PI, true); // Boca
pincel.moveTo(65, 65);
pincel.arc(60, 65, 5, 0, Math.PI * 2, true); // olho esquerdo
pincel.moveTo(95, 65);
pincel.arc(90, 65, 5, 0, Math.PI * 2, true); // Olho direito
pincel.stroke();

