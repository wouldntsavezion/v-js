require("dotenv").config();

module.exports = {
	development: {
		client: "sqlite3",
		debug: true,
		connection: ()=>({
			filename: process.env.SQLITE_FILE
		}),
		flags: ["OPEN_SHAREDCACHE"],
		migrations: {
			directory: process.env.SQLITE_MIGRATIONS,
			tableName: "knex_migrations"
		},
		seeds: {
			directory: process.env.SQLITE_SEEDS,
		},
		useNullAsDefault: true
	},
	production: {
		client: "sqlite3",
		connection: ()=>({
			filename: process.env.SQLITE_FILE
		}),
		flags: ["OPEN_SHAREDCACHE"],
		migrations: {
			directory: process.env.SQLITE_MIGRATIONS,
			tableName: "knex_migrations"
		},
		seeds: {
			directory: process.env.SQLITE_SEEDS,
		},
		useNullAsDefault: true
	}
};