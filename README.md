# ModalWeather
Modal with API openweathermap


1) For use you can get a API key after registration  on https://openweathermap.org/
2) Connect jquery.js
3) Open WeatherWidjet.js and find getAPI then change on your API key 


HTML
``
<input type="button" class='open' value="W" >
<div class = "container">
        <img class="load" src="282.gif">
        <input type="button" value='X' class='close'>
        <div class='btn'><input type="button" value='3 DAY FORECAST' class='day3Open'></div>
        <p class='dgr'></p>
        <p class='hide' data-day='1'></p>
        <p class='hide' data-day='2'></p>
        <p class='hide' data-day='3'></p>
</div>
``




``
            this.getAPID = function () {
            return this.APID = 'YOU API ID';
            }
``

4)  initialize the script: ``weather.init();``


PavelP
