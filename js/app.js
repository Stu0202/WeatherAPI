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
            cleanHTML();
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
        const{main:{temp,temp_max,temp_min}} = data
        const degreesCelsius = kelvinToCelsius(temp)
        const current = document.createElement('p')
        current.innerHTML=`
            ${degreesCelsius} &#8451;
        `
        current.classList.add('font-bold','text-6xl')
        const divResult = document.createElement('div')
        divResult.classList.add('text-center','text-white')
        divResult.appendChild(current)
        result.appendChild(divResult)

       
    }

    const  kelvinToCelsius = degrees => parseInt(degrees-273.15)


    function cleanHTML(){
        while(result.firstChild){
            result.removeChild(result.firstChild)
        }
    }


  
        

