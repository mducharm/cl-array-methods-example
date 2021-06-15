import './style.css'



const movies = await fetch("movies.json")
                    .then(m => m.json())
                    .then(m => cleanMovies(m))



document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
