// https://api.openweathermap.org/data/2.5/weather?q=Allahabad&appid=39895cf5095951f2ba21a81a34ffe72a

const http = require('http');
const fs = require('fs');
var requests = require('requests');

const homeFile = fs.readFileSync('home.html', 'utf-8');

const replaceval = (tempVal, orgval) => {
    let temprature = tempVal.replace("{%tempval%}", orgval.main.temp);
    temprature = temprature.replace("{%tempmin%}", orgval.main.temp_min);
    temprature = temprature.replace("{%tempmax%}", orgval.main.temp_max);
    temprature = temprature.replace("{%location%}", orgval.name);
    temprature = temprature.replace("{%country%}", orgval.sys.country);
    temprature = temprature.replace("{%tempstatus%}", orgval.weather[0].main);
    return temprature;
}
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Allahabad&appid=39895cf5095951f2ba21a81a34ffe72a')
            .on('data', (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                const realTimeData = arrData.map((val) => replaceval(homeFile, val)).join("");
                res.write(realTimeData);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});


server.listen(8000, "127.0.0.1")