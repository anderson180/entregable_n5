const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require('./Genre');
const Movie = require('./Movie');

Movie.belongsToMany(Actor, { through: 'Movie_Actor' });
Actor.belongsToMany(Movie, { through: 'Movie_Actor' });

Movie.belongsToMany(Director, { through: 'Movie_Director' });
Director.belongsToMany(Movie, { through: 'Movie_Director' });

Movie.belongsToMany(Genre, { through: 'Movie_Genre' });
Genre.belongsToMany(Movie, { through: 'Movie_Genre' });