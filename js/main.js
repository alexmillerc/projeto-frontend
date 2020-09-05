var x=document.getElementById("localizacao");

function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Seu browser não suporta Geolocalização.";}
  }
function showPosition(position)
  {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=ff82e634261a603c20b82654d076ea5c`;
    fetchApi(url);  
  }

  function showError(error)
  {
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="Usuário rejeitou a solicitação de Geolocalização."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Localização indisponível."
      break;
    case error.TIMEOUT:
      x.innerHTML="A requisição expirou."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="Algum erro desconhecido aconteceu."
      break;
    }
  };


function fetchApi(url) {
    let cidade = document.getElementById('cidade');
    let pais = document.getElementById('pais');
    let temp = document.getElementById('temp');
    let umid = document.getElementById('umid');
    fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let tempCelsius = ((5/9) * (data.main.temp-32)).toFixed(1);
      cidade.innerText = data.name;
      pais.innerText = data.sys.country;
      console.log(data);
      temp.innerText = tempCelsius;
      umid.innerText = data.main.humidity;
      document.getElementById("mostra-cidade").hidden = false;
      document.getElementById("mostra-pais").hidden = false;
      document.getElementById("mostra-temp").hidden = false;
      document.getElementById("mostra-umid").hidden = false;


    })
    .catch((err) => {
      cidade.innerText = 'Erro na conexão, tente mais tarde.';
      temp.innerText = '-';
    })
  }

  


