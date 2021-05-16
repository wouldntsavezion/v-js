exports.seed = function(knex) {
	return knex('bookstore_books').del()
		.then(function () {
			return knex('bookstore_books').insert([
				{id_bookstore: 1, id_book: 1, quantity: 1},
			]);
		});
};
