
        (() => {
            let open = document.querySelector('.open');
            let container = document.querySelector('.container');
            let close = document.querySelector('.close');
            let btn3day = document.querySelector('.day3Open');
            let p = document.querySelector('.dgr');
            let loader = document.querySelector('.load');

            function WheatherWidget() {
            let _that = this;

            this.coordsMisnk = 'lat=53.9023&lon=27.5619';

            this.getAPID = function () {
            return this.APID = 'YOU API ID';
            }
            this.getAPI = function () {
                if(localStorage.latitude && localStorage.longitude){
            return this.API = `http://api.openweathermap.org/data/2.5/weather?lat=${localStorage.latitude}&lon=${localStorage.longitude}&APPID=${this.getAPID()}`;
                } else {
            return this.API = `http://api.openweathermap.org/data/2.5/weather?${this.coordsMisnk}&APPID=${this.getAPID()}`;
                }
            }

            this.get3daysAPI = function() {
                if(localStorage.latitude && localStorage.longitude){
                    return this.API = `http://api.openweathermap.org/data/2.5/forecast?lat=${localStorage.latitude}&lon=${localStorage.longitude}&APPID=${this.getAPID()}`;
                        } else {
                    return this.API = `http://api.openweathermap.org/data/2.5/forecast?${this.coordsMisnk}&APPID=${this.getAPID()}`;
                        }
                    }

            this.getWeather = function () {
            return  $.ajax(this.getAPI(),
            {
                type: 'GET',
                dataType: 'json',
                success: this.dataLoaded,
                error: this.errorFunc,
                xhrFields: {onprogress: _that.progress}
            });
            };

            this.get3DayWeather = function () {
                return  $.ajax(this.get3daysAPI(),
                {
                    type: 'GET',
                    dataType: 'json',
                    success: this.dataLoaded3Day,
                    error: this.errorFunc,
                    beforeSend:  _that.onprogress()
                });
                };

            this.onprogress = function (){
                    loader.style.display = 'block';
            }

            this.dataLoaded = function (data) {
                console.log(data);
                let dgr = document.querySelector('.dgr');
                let button = document.querySelector('.close').style.display = 'block';
                let city = data.name.split(' ');
                let img = document.createElement('img');
                img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

                loader.style.display = 'none';
                if (city[0] === 'Horad'){
                dgr.innerHTML = `Now in ${city[1]} ${(data.main.temp - 273.15)} C° `;
                } else {
                    dgr.innerHTML = `Now in ${data.name} ${(data.main.temp - 273.15).toFixed(1)} C°`;
                }
                dgr.appendChild(img);
            }

            this.dataLoaded3Day = function (data){
                console.log(data);
                let days = document.querySelectorAll('[data-day]');
                let next = 0;
                let j = 0;
                loader.style.display = 'none';
                for(let i = 0; i < days.length; i++){
                    days[i].classList.toggle('hide');
                    for (j+next; j < data.list.length; j ++){
                    if (data.list[j+next].dt_txt.split(' ')[1] === '12:00:00'){
                    let img = document.createElement('img');
                    img.src = `http://openweathermap.org/img/w/${data.list[j+next].weather[0].icon}.png`;
                    days[i].innerHTML = `${data.list[j+next].dt_txt} ${(data.list[j+next].main.temp - 273.15).toFixed(1)} C°`;
                    days[i].appendChild(img);
                    next = j+next;
                    if(j === 0) {j += 8;}
                    break;
                     }
                    }
                }
            }

            this.errorFunc = function(errorStr){
               return errorStr;
            }
    };
    
    open.addEventListener('click',function() {
            container.style.display = 'block';
            this.style.display='none';
        },false);

    close.addEventListener('click',function () {
    container.style.display = 'none';
    container.style.display='none';
    open.style.display = 'block';
        },false);
    
    btn3day.addEventListener('click',function() {
        new WheatherWidget().get3DayWeather();

    },false);
            (() => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                localStorage.setItem('latitude', position.coords.latitude);
                localStorage.setItem('longitude', position.coords.longitude);
                });
            }
        })();


        return weather = {
            hide: function () {return open.style.display = 'block';},
            init: function() {this.hide(); new WheatherWidget().getWeather(); }
        }
    })();

    weather.init();


