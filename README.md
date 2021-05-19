# v-js

## npm scripts

To setup the DB :
  * Run `update-db` in `/server`
  * Run `seed-db` in `/server`

To start the server : 
  * Run `start` in `/server`

To start the jobs :
  * Run `tasks` in `/server`

To run the tests :
  * Run `tests` in `/server`

## Routes
There are some static routes that will return proper html

### /
The home page will actually print this README.md file

### /book 

`{bookid: int, storeid: int}`

This retrieves a book via query params, `bookid` is required to find the book. If `storeid` is also included, it will append the information relevant to this book from the specified store. 

## API
The api is at `/api/` and all the endpoints are private, just access it via a browser to easily enter the http auth. There is no front-end to register users but the app does use proper authentication and user data from it's database, so for testing purposes the available user is :

`{username: "admin", password: "celinedion"}`

### /api/fetch [GET]

`{bookid: int, storeid: int}`

Same as /book, but this returns the information in JSON format.

### /api/create [POST]

`{isbn: string, name: string, author:string, date:string}`

This will insert a book entry in the DB, all the data is required, the ISBN length must be 13, the date will be parsed with Date.parse()

### /api/update [POST]

`{bookid: int, storeid: int, quantity: int}`

This will insert or update a bookstore_book entry in the DB, all the data is required, the book and the store specified must exist. If quantity is <= 0, the status will be set to OUT_OF_STOCK. IN_STOCK otherwise.

### /api/delete [POST]

`{bookid: int}`

This will delete a book in the DB.

## Comments

* I though I'd install React at some point but the "front-end" was actually put up together pretty quickly in a terribly hacky way and I might've actually saved some time with React in the end.

* It was the first time I used MOST of what is used in this project and I spent a TON of hours just learning everything and making sure I used it all as properly as I could.

* I spent a lot more hours than I thought I would on this (~30h)
