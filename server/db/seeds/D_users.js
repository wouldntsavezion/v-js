exports.seed = function(knex) {
	return knex('users').del()
		.then(function () {
			return knex('users').insert([
				{id: 1, username: "admin", password: "9bf3080fd64c5b437bbb0914311412f8:9188c6d8d16c37bd1d37"},
			]);
		});
};
