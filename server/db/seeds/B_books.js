exports.seed = function(knex) {
	return knex('books').del()
		.then(function () {
			return knex('books').insert([
				{id: 1, isbn: "9780261102927", name: "The Fellowship of the Ring", author: "J.R.R. Tolkien", date: "9/7/1954"},
				{id: 2, isbn: "9780261102361", name: "The Two Towers", author: "J.R.R. Tolkien", date: "11/11/1954"},
				{id: 3, isbn: "9780261103405", name: "The Return of The King", author: "J.R.R. Tolkien", date: "20/10/1955"},
			]);
		});
};