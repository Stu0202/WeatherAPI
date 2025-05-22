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
    
   spinner();

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
        const{name, main:{temp,temp_max,temp_min}} = data

        const degreesCelsius = kelvinToCelsius(temp)
        const max = kelvinToCelsius(temp_max)
        const min = kelvinToCelsius(temp_min)
        
        const city = document.createElement('p')
        city.textContent = `Clima en: ${name}`
        city.classList.add('font-bold','text-2xl')

       
        const current = document.createElement('p')
        current.innerHTML=`${degreesCelsius} &#8451;`
        current.classList.add('font-bold','text-6xl')

        const maxTemp = document.createElement('p')
        maxTemp.innerHTML = `Max: ${max} &#8451; `
        maxTemp.classList.add('text-xl')

        const minTemp = document.createElement('p')
        minTemp.innerHTML = `Min: ${min} &#8451; `
        minTemp.classList.add('text-xl')

        


        const divResult = document.createElement('div')
        divResult.classList.add('text-center','text-white')
        divResult.appendChild(city)
        divResult.appendChild(current)
        divResult.appendChild(maxTemp)
        divResult.appendChild(minTemp)

        result.appendChild(divResult)

       
    }

    const  kelvinToCelsius = degrees => parseInt(degrees-273.15)


    function cleanHTML(){
        while(result.firstChild){
            result.removeChild(result.firstChild)
        }
    }

    function spinner(){
        cleanHTML();
        const spinnerDiv = document.createElement('div')
        spinnerDiv.classList.add('spinner')

        spinnerDiv.innerHTML = `
         
          <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        `
        result.appendChild(spinnerDiv)
    }


  
        

