var btn = document.getElementById("box__info--btn")
btn.addEventListener("click", getGeolocation);


function getGeolocation() {
  let e = document.getElementById("box__info--location");
  let x = document.getElementById("box__info--date");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  else {
    x.innerHTML = "Seu browser não suporta Geolocalização.";
  };

  function showPosition(pos) {
    const coordinates = { lat: pos.coords.latitude, long: pos.coords.longitude }
    let { lat, long } = coordinates

    console.log(lat)
    console.log(long)

    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=ff82e634261a603c20b82654d076ea5c`;
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
  let location = document.getElementById('box__info--location');
  let dateview = document.getElementById('box__info--date');
  let temp = document.getElementById('box__info--temp');

  console.log(url)

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data)

      location.innerText = data.name.toUpperCase();
      temp.innerText = temperature(data.main.temp_max);

      function temperature(tempC, tempF = Math.round(data.main.temp_max)) {
        tempC = Math.round(Math.round(data.main.temp_max - 32).toFixed(1) * (5 / 9))
        var tempCF = `${tempC}ºC | ${tempF}ºF`;

        if (tempC > 28) {
          document.getElementById("box__canvas--fire").hidden = false;
        }
        else {
          if (tempC > 18) {
            document.getElementById("box__canvas--normal").hidden = false;
          } else {
            document.getElementById("box__canvas--cold").hidden = false
          }
        };

        return [tempCF];
      }

      var date = new Date();

      class Months {
        constructor(name) {
          this.id = undefined;
          this.name = name;
          this.months = new Array();
        }

        getname() {
          return this.name;
        };

        getMonths() {
          return this.months;
        };

        addMonths(month) {
          this.months.push(month);
        };

      }

      const monthsModel = new Months("Meses do Ano");

      monthsModel.addMonths("Janeiro")
      monthsModel.addMonths("Fevereiro")
      monthsModel.addMonths("Março")
      monthsModel.addMonths("Abril")
      monthsModel.addMonths("Maio")
      monthsModel.addMonths("Junho")
      monthsModel.addMonths("Julho")
      monthsModel.addMonths("Agosto")
      monthsModel.addMonths("Setembro")
      monthsModel.addMonths("Outubro")
      monthsModel.addMonths("Novembro")
      monthsModel.addMonths("Dezembro")

      console.log(monthsModel.getname());
      console.log(monthsModel.getMonths());

      var weekday = new Array(7);
      weekday[0] = "Domingo";
      weekday[1] = "Segunda";
      weekday[2] = "Terça";
      weekday[3] = "Quarta";
      weekday[4] = "Quinta";
      weekday[5] = "Sexta";
      weekday[6] = "Sabádo";


      var minutes =
        `${date.getMinutes() < 11 ? "0" + date.getMinutes() : date.getMinutes()}`;
      var date =
        `${weekday[date.getDay()].toUpperCase()} | ${date.getDate()} ${monthsModel.getMonths()[date.getMonth()].toUpperCase().substring(0, 3)} | ${date.getHours()}:${minutes}`;

      console.log(date)

      dateview.innerText = date;

    });

};


var pincel = document.getElementById('box__canvas--normal').getContext('2d');
pincel.beginPath();
pincel.arc(75, 75, 50, 0, Math.PI * 2, true); // Rosto
pincel.arc(75, 75, 51, 0, Math.PI * 2, true); // Rosto
pincel.fillStyle = 'yellow';
pincel.fill();
pincel.moveTo(110, 75);
pincel.arc(75, 75, 35, 0, Math.PI, false); // Boca
pincel.moveTo(111, 76);
pincel.arc(75, 75, 35, 0, Math.PI, false); // Boca
pincel.moveTo(65, 65);
pincel.arc(60, 65, 5, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 4, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 3, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 2, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 1, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 0, 0, Math.PI * 2, true); // olho esquerdo
pincel.moveTo(95, 65);
pincel.arc(90, 65, 5, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 4, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 3, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 2, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 1, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 0, 0, Math.PI * 2, true); // Olho direito
pincel.stroke();

var pincel = document.getElementById('box__canvas--fire').getContext('2d');
pincel.beginPath();
pincel.arc(75, 75, 50, 0, Math.PI * 2, true); // Rosto
pincel.arc(75, 75, 51, 0, Math.PI * 2, true); // Rosto
pincel.fillStyle = 'orange';
pincel.fill();
pincel.moveTo(50, 90);
pincel.arc(100, 90, 0, 0, Math.PI, true); // Boca
pincel.moveTo(51, 91);
pincel.arc(100, 90, 0, 0, Math.PI, true); // Boca
pincel.moveTo(65, 65);
pincel.arc(60, 65, 5, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 4, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 3, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 2, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 1, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 0, 0, Math.PI * 2, true); // olho esquerdo
pincel.moveTo(95, 65);
pincel.arc(90, 65, 5, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 4, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 3, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 2, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 1, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 0, 0, Math.PI * 2, true); // Olho direito
pincel.stroke();

var pincel = document.getElementById('box__canvas--cold').getContext('2d');
pincel.beginPath();
pincel.arc(75, 75, 50, 0, Math.PI * 2, true); // Rosto
pincel.arc(75, 75, 51, 0, Math.PI * 2, true); // Rosto
pincel.fillStyle = 'blue';
pincel.fill();
pincel.moveTo(100, 110);
pincel.arc(75, 110, 25, 0, Math.PI, true); // Boca
pincel.moveTo(101, 111);
pincel.arc(75, 110, 25, 0, Math.PI, true); // Boca
pincel.moveTo(65, 65);
pincel.arc(60, 65, 5, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 4, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 3, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 2, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 1, 0, Math.PI * 2, true); // olho esquerdo
pincel.arc(60, 65, 0, 0, Math.PI * 2, true); // olho esquerdo
pincel.moveTo(95, 65);
pincel.arc(90, 65, 5, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 4, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 3, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 2, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 1, 0, Math.PI * 2, true); // Olho direito
pincel.arc(90, 65, 0, 0, Math.PI * 2, true); // Olho direito
pincel.stroke();


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () { console.log("Service Worker Registered"); });
}


