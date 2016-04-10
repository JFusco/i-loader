'use strict';

import ILoader from './i-loader';

const iloader = new ILoader({
	async: true,
	onProgress(progress) {
		console.log('progress of images', progress);

		document.write(progress);
	}
});

iloader.load([
	'http://eskipaper.com/images/space-1.jpg',
	'http://www.hdwallpapers.in/walls/halloween_2013-wide.jpg',
	'http://www.nasa.gov/sites/default/files/thumbnails/image/iss044e045542.jpg',
	'http://www.hdwallpapers.in/walls/2013_movie_cloudy_with_a_chance_of_meatballs_2-wide.jpg', 'http://www.hdwallpapers.in/walls/bates_motel_2013_tv_series-wide.jpg', 'http://www.hdwallpapers.in/walls/krrish_3_movie-wide.jpg', 'http://www.hdwallpapers.in/walls/universe_door-wide.jpg', 'http://www.hdwallpapers.in/walls/night_rider-HD.jpg', 'http://www.hdwallpapers.in/walls/tide_and_waves-wide.jpg', 'http://www.hdwallpapers.in/walls/2014_lamborghini_veneno_roadster-wide.jpg', 'http://www.hdwallpapers.in/walls/peeta_katniss_the_hunger_games_catching_fire-wide.jpg', 'http://www.hdwallpapers.in/walls/captain_america_the_winter_soldier-wide.jpg', 'http://www.hdwallpapers.in/walls/puppeteer_ps3_game-wide.jpg', 'http://www.hdwallpapers.in/walls/lunar_space_galaxy-HD.jpg', 'http://www.hdwallpapers.in/walls/2013_wheelsandmore_lamborghini_aventador-wide.jpg'
]).then((completed) => {
	alert('DONE', completed);
});