import './style.css'
import { cleanMovieData } from './utils'

const movies = await fetch("movies.json")
    .then(m => m.json())
    .then(m => cleanMovieData(m));

// * map
//#region 

let costOfMoviesPerMinute = [];
for (let movie of movies) {
    let movieCostPerMinute = {
        title: movie.title,
        costPerMinute: movie.budget / movie.runtime
    }

    costOfMoviesPerMinute.push(movieCostPerMinute)
}

// const calculateCostPerMinute = m => ({ 
//     title: movie.title, 
//     costPerMinute: movie.budget / movie.runtime 
// });
// const costOfMoviesPerMinute = movies.map(calculateCostPerMinute);

//#endregion

// * filter
//#region 

let thrillers = [];
for (let movie of movies) {
    for (let genre of movie.genres) {
        if (genre === "Thriller") {
            thrillers.push(genre);
            break;
        }
    }
}

// const isThriller = movie => movie.genres.some(g => g.name === "Thriller");
// const thrillers = movies.filter(isThriller);
//#endregion

// * reduce
//#region 

let popularitySum = 0;
for (let thriller of thrillers) {
    popularitySum += thriller.popularity;
}
let averagePopularityOfThrillers = popularitySum / thrillers.length;


// const averagePopularityOfThrillers = thrillers.reduce((a, b) => a.popularity + b.popularity) / thrillers.length
//#endregion

// * combining them all
//#region 
const getMovieDetails = movie => ({
    title: movie.title,
    tagline: movie.tagline,
    overview: movie.overview,
    vote_average: movie.vote_average
})
const isScienceFiction = movie => movie.genres.some(g => g.name === "Science Fiction");
const movieDetailElement = movie => `
    <h3><span>${movie.vote_average}</span> - ${movie.title}</h3>
    <h5><i>${movie.tagline}</i></h5>
    <p>${movie.overview}</p>
`

const scienceFictionSection = movies
                                .filter(isScienceFiction)
                                .map(getMovieDetails)
                                .map(movieDetailElement)
                                .reduce((a, b) => `${a}${b}`)

//#endregion

document.querySelector('#app').innerHTML = `
    <section>
        <h1>🤖 Science Fiction 👽</h1>
        ${scienceFictionSection}
    </section>
`
