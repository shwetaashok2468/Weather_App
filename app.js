window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan  = document.querySelector(".temperature span");
    //dark sky api
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const  proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/cdb47f90e38934b7afc65589e8868558/${lat},${long}`;
            //first api parameter gives latitude and second gives longitude
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                   // console.log(data);
                    const {temperature,summary,icon} = data.currently;
                    //set dom elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone
                    //formula for celcious
                    let celsius = (temperature - 32)*(5/9);
                    setIcons(icon,document.querySelector(".icon"));


                    //C to F

                    temperatureSection.addEventListener('click',()=>{
                        if(temperatureSpan.textContent==="F")
                        {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);

                        }else
                        {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }
    function setIcons(icon,iconID) {
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});