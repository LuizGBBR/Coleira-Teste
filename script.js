let h2 = document.querySelector('h2');

var latitude;
var longitude;
var id;

var formBtn = document.getElementById('frmButton').elements;
    formBtn['enviarID'].onclick = function () {
    id=formBtn['id'].value;
        enviarLoc();
    }



var map;

function success(pos){
    console.log(pos.coords.latitude, pos.coords.longitude)
    h2.textContent = `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;

latitude= pos.coords.latitude;
longitude= pos.coords.longitude;

    map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13); //se for usar a de cima apagar essa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([pos.coords.latitude, pos.coords.longitude],).addTo(map)
    .bindPopup('Você está aqui')
    .openPopup();
}

    function error(err){
        console.log(err);
    }
    

var watchID = navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000

});

async function enviarLoc(){
    const response = await fetch("https://petland-bxg3nq4da-camilams27.vercel.app/pet/coleira", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: `{
           "id": ${id},
           "latitude": ${latitude},
           "longitude": ${longitude}
            }`,
        });
        
        response.json().then(data => {
          console.log(data);
        });

}