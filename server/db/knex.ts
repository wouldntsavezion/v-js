//@ts-ignore
import * as knexconfig from "../knexfile.js";

const config = 
	process.env.NODE_ENV == "production" ? knexconfig.production : 
	process.env.NODE_ENV == "tests" ? knexconfig.tests :
	knexconfig.development

const knex = require('knex')(config);

export default knex;