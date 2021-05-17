require("dotenv").config();

module.exports = {
	development: {
		client: "sqlite3",
		debug: true,
		connection: ()=>({
			filename: process.env.SQLITE_FILE
		}),
		pool: { afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb) }, // https://github.com/knex/knex/issues/453#issuecomment-54160324
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
		pool: { afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb) }, // https://github.com/knex/knex/issues/453#issuecomment-54160324
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