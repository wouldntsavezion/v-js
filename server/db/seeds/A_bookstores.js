exports.seed = function(knex) {
	return knex('bookstores').del()
		.then(function () {
			return knex('bookstores').insert([
				{id: 1, name: "Amalie Library", location: "Tampa, Florida"},
				{id: 2, name: "American Airlines Bookstore", location: "Dallas, Texas"},
				{id: 3, name: "Ball Library", location: "Denver, Colorado"},
				{id: 4, name: "BB&T Bookstore", location: "Sunrise, Florida"},
				{id: 5, name: "Bell Bookstore", location: "Montreal, Quebec"},
				{id: 6, name: "Bell MTS Books", location: "Winnipeg, Manitoba"},
				{id: 7, name: "Bridgestone Library", location: "Nashville, Tennessee"},
				{id: 8, name: "Canadian Tire Bookstore", location: "Ottawa, Ontario"},
				{id: 9, name: "Capital One Library", location: "Washington, D.C"},
				{id: 10, name: "Enterprise Bookstore", location: "St. Louis, Missouri"},
				{id: 11, name: "Gila River Library", location: "Glendale, Arizona"},
				{id: 12, name: "Honda Bookstore", location: "Anaheim, California"},
				{id: 13, name: "KeyBank Bookstore", location: "Buffalo, New York"},
				{id: 14, name: "Little Caesars Library", location: "Detroit, Michigan"},
				{id: 15, name: "Madison Square Books", location: "New York, New York"},
				{id: 16, name: "Nassau Coliseum", location: "Uniondale, New York"},
				{id: 17, name: "Nationwide Library", location: "Columbus, Ohio"},
				{id: 18, name: "PNC Library", location: "Raleigh, North Carolina"},
				{id: 19, name: "PPG Paints Library", location: "Pittsburgh, Pennsylvania"},
				{id: 20, name: "Prudential Bookstore", location: "Newark, New Jersey"},
				{id: 21, name: "Rogers Library", location: "Vancouver, British Columbia"},
				{id: 22, name: "Rogers Books", location: "Edmonton, Alberta"},
				{id: 23, name: "Scotiabank Library", location: "Toronto, Ontario"},
				{id: 24, name: "Scotiabank Repository", location: "Calgary, Alberta"},
				{id: 25, name: "SAP Bookstore", location: "San Jose, California"},
				{id: 26, name: "Staples Bookstore", location: "Los Angeles, California"},
				{id: 27, name: "TD Books", location: "Boston, Massachusetts"},
				{id: 28, name: "T-Mobile Library", location: "Paradise, Nevada"},
				{id: 29, name: "United Bookstore", location: "Chicago, Illinois"},
				{id: 30, name: "Wells Fargo Bookstore", location: "Philadelphia, Pennsylvania"},
				{id: 31, name: "Xcel Energy Bookstore", location: "Saint Paul, Minnesota"},
			]);
		});
};
