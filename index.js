// from nearly 10000 planets to 8 possibly habitable planets:
const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];
function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36  && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true
  }))

  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(`Error: ${err}`)
  })
  .on('end', () => {
    console.log(`Habitable Planets from NASA ExoPlanet Archive -Kepler finds: ${habitablePlanets.length} planets found!`)
    const habitablePlanetNames = habitablePlanets.map(planet =>{ 
      return planet['kepler_name']
    }) 
    console.log(habitablePlanetNames) 
    console.log('Done processing the csv file')
  })


