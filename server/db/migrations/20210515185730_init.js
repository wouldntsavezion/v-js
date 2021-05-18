exports.up = function(knex) {
	return knex.schema
	.createTable("books", function (table) {
		table.increments("id");
		table.string("isbn", 13).notNullable().unique();
		table.string("name", 255).notNullable();
		table.string("author", 255).notNullable();
		table.date("date").notNullable().defaultTo(Date.now());
	})
	.createTable("bookstores", function(table) {
		table.increments("id");
		table.string("name").notNullable();
		table.string("location").notNullable();
	})
	.createTable("bookstore_books", function(table) {
		table.integer("id_bookstore").references("bookstores.id").onDelete("cascade");
		table.integer("id_book").references("books.id").onDelete("cascade");
		table.integer("quantity").notNullable().defaultTo(0);
		table.enu("status", ["BOOKSTORE_BOOK_STATUS_IN_STOCK", "BOOKSTORE_BOOK_STATUS_OUT_OF_STOCK"]).defaultTo("BOOKSTORE_BOOK_STATUS_OUT_OF_STOCK");
	});
};

exports.down = function(knex) {
	return knex.schema
		.dropTable("bookstore_books")
		.dropTable("books")
		.dropTable("bookstores");
};

exports.config = { transaction: false };