exports.seed = function(knex) {
	return knex('users').del()
		.then(function () {
			return knex('users').insert([
				{id: 1, username: "admin", password: "601f089e5802f3ece4bfea278807ac92:0b286308e7326886dc00"},
			]);
		});
};
