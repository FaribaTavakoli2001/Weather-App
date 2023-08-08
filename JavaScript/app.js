
const getlocation = async () => {

    const url = `http://ip-api.com/json/?fields=country,city,lat,lon,timezone`;

    const response = await fetch(url);
    const data = await response.json();

    return data;

}

const getweather = async (lat, lon) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?
lat=${lat}&lon=${lon}&appid=f0894defae7c5584798f8812232a40c2`;

    const response = await fetch(url);
    const data = await response.json();
    return data;


}




function getDayorNight() {

    let DayorNight;
    let d = new Date();

    if (d.getHours() >= 6 && d.getHours() <= 18) {
        DayorNight = 'Day';
    } else {
        DayorNight = 'Night';
    }
    // console.log(DayorNight)

}

function getIcon(weMain) {
    let icon;
    switch (weMain) {

        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;

        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;

        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'clear':
            const DayorNight = getDayorNight;
            icon = `${weMain}-${DayorNight}.svg`;
            break;

        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmospher':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}

function getTemp(weTemp) {
    const K = weTemp;
    const F = (K - 273.15) * 9 / 5 + 32;
    const C = K - 273.15;

    const Temp = {
        kel: Math.floor(K),
        Far: Math.floor(F),
        Cel: Math.floor(C)
    };

    return Temp;

}

const loctimezone = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const degsec = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span')
const tede = document.querySelector('.temperature-description');


getlocation()
    .then(locData => {
        const timezone = locData.timezone;
        loctimezone.textContent = timezone;
        return getweather(locData.lat, locData.lon);

    }).then(weData => {
        const weTemp = weData.main.temp;
        const weMain = weData.weather[0].main;
        const weDes = weData.weather[0].description;
        console.log(weTemp, weDes, weMain)

        const iconName = getIcon(weMain);
        icon.innerHTML = `<img src = '../icons/${iconName}'></img>`;


        deg.textContent = Math.floor(weTemp);
        unit.textContent = 'K';

        degsec.addEventListener('click', function (e) {
            if (unit.textContent == 'K') {
                deg.textContent = getTemp(weTemp).Far;
                unit.textContent = 'F';


            } else if (unit.textContent == 'F') {
                deg.textContent = getTemp(weTemp).Cel;
                unit.textContent = 'C';

            } else {
                deg.textContent = getTemp(weTemp).kel;
                unit.textContent = 'K';

            }
        })

        tede.textContent = weDes;

    });

















