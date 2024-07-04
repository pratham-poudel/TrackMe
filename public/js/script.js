
const socket = io();
if(navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('sendLocation', { latitude, longitude });
       
    }, (error) => {
        console.log(error);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    });
    
}








var map = L.map('map').setView([0, 0], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: ' <a href="https://www.chandrautahospital.com.np/">Website</a>'
}).addTo(map);

const markers={};
socket.on('receiveLocation', (data) => {
    
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude]);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 100,
        attribution: ' <a href="https://www.chandrautahospital.com.np/">Website</a>'
    }).addTo(map);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
    
    
});
socket.on('removeLocation', (data) => {
    const { id } = data;
    if(markers[id]){
        map.removeLayer(markers[id]);
    delete markers[id];
    }
    
});
