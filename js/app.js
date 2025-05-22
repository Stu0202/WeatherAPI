const container = document.querySelector('.container')
const result = document.querySelector('#resultado')
const form = document.querySelector('#formulario')

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather)
})

function searchWeather(e) {
    e.preventDefault();
    
    const city = document.querySelector('#ciudad').value
    const country = document.querySelector('#pais').value

   if(city === '' || country===''){
        showError('All fields are required')
        return
   }

   e.preventDefault()
    const appID = '1adee8b0d97d53fc41166c2e436aa21f' 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`
    
    fetch(url)
        .then( response => response.json())
        .then( data => {
            if(data.cod==="404"){
                showError("City doesn't found")
                return;
            }

            showWeather(data);
        })
}

function showError(message) {
        
        const alert = document.querySelector('.bg-red-100')

        if(!alert){
            const alertMessage = document.createElement('div')
             alertMessage.classList.add('bg-red-100','border-red-400','text-red-400','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center')
            alertMessage.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${message}</span>
            `
            container.appendChild(alertMessage)

            setTimeout(() => {
                alertMessage.remove()
            }, 3000);
        }
    }
 
    function showWeather(data){
        
    }


  
        

