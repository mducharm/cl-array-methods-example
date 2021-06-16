/** Ensures that JSON string has correct format, and can be parsed into object */
function cleanMalformedJSON(json) {
    if (typeof json !== "string") {
        return json;
    }

    return json
        .replaceAll(`"`, `'`)
        .replaceAll("{'", '{"')
        .replaceAll("'}", '"}')
        .replaceAll("':", '":')
        .replaceAll(": '", ': "')
        .replaceAll("',", '",')
        .replaceAll(", '", ', "')
        .replaceAll("['", '["')
        .replaceAll("']", '"]');
}

function parseJSON(s) {
    if (typeof s !== "string") {
        return s;
    }
    return JSON.parse(cleanMalformedJSON(s))
}

/**
 * Since some of the movie data contains stringified JSON in an incorrect format, this fixes & parses said JSON.
 */
export function cleanMovieData(movies) {
    return movies.map(movie => {
        return {
          ...movie,
          genres: parseJSON(movie.genres),
          production_companies: parseJSON(movie.production_companies),
          production_countries: parseJSON(movie.production_countries),
          spoken_languages: parseJSON(movie.spoken_languages),
        }
      })
}
