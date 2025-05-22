const container = document.querySelector('.container')
const result = document.querySelector('#resultado')
const form = document.querySelector('#formulario')

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather)
})

function searchWeather(e) {
    e.preventDefault();
    console.log('Buscando clima');
}

