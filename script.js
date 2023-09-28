const api = {
    key: "28fd15358cdecbc1a1dfef367e71acef",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");

btn.addEventListener("click", getData);

function getDated () {
    const d = new Date();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date}, ${month}, ${year}`;
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(res=>{
        return res.json()
    }).then(getDisplayData)
}

function getDisplayData(res){
    if(res.cod==="404"){
        const error = document.querySelector(".error")
        error.innerHTML = "Please enter a valid city";
        search.value = ''
    }
    else if(search.value==''){
        alert("Please enter the city name")
    }
    else{
        const city = document.querySelector(".city")
        const date = document.querySelector(".date")
        const temp = document.querySelector(".temp")
        const weather = document.querySelector(".weather")
        const tempRange = document.querySelector(".temp-range")
        city.innerHTML = `${res.name}, ${res.sys.country}`;
        date.innerHTML = getDated()
        temp.innerHTML = `Temp : ${Math.round(res.main.temp)}`
        weather.innerHTML = `Weather : ${ res.weather[0].main}`
        tempRange.innerHTML = `Temp Range: ${res.main.temp_max} / ${res.main.temp_min} `
    }
    
    
}