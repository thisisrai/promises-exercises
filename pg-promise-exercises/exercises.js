const pg = require('pg-promise')()
const assert = require('assert')

const postgresConfig = {
  host: 'localhost',
  port: 5432,
  database: 'pg-promise-exercises',
  user: 'raifunglee', // replace this with your username
  password: '' //  replace this if you have set a password for your username (this is unlikely)
};


const db = pg(postgresConfig);

/* -----------------------------------------
   Exercise 1
   -----------------------------------------

   This is an example function that finds all the books from the `books` table
   @function: `allBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]

   The assertion fails, and you have to make it pass.

*/

/* This is calling the `then` function on the `allBooks` promise, and checks if
   we get back 15 rows. This assertion will fail. Make it PASS!*/

const allBooks = db.any('select * from books')

  .then(books => {
  assert.deepEqual(books.length, 15);
}).catch(error => {
  console.log('Dang, my assertion failed.');
});

/* --------End of Exercise 1---------------- */

/* -----------------------------------------
           Exercise 2
   -----------------------------------------

   Implement the function `firstTenBooks` which returns just the names of the
   books, and make the assertion pass.
   @function: `firstTenBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]

*/

// = .... IMPLEMENT THIS FUNCTION

let firstTenBooks = db.any('select title from books')

firstTenBooks.then(books => {
  assert(books.length, 10);
}).catch(error => {
  console.log('Whoops, my function doesnt behave as expected.', error);
});

/* --------End of Exercise 2---------------- */

/* -----------------------------------------
            Exercise 3
   -----------------------------------------

   Implement the function `findAuthorsOrderedByLastName` which returns all the
   authors from the the `authors` table, and the rows are ordered by the
   `last_name`.


   @function: `findAuthorsOrderedByLastName`
   @input params: None
   @output: [{id, first_name, last_name}]
*/

// = .... IMPLEMENT THIS FUNCTION

let findAuthorsOrderedByLastName = db.any('select * from authors order by last_name')
.then(authors => {
  assert.deepEqual(authors.length, 19)
  assert.deepEqual(authors[0].last_name, 'Alcott')
  assert.deepEqual(authors[18].last_name, 'Worsley')
}).catch(error => {
  console.log('Whoops, my function doesnt behave as expected.', error);
});

/* --------End of Exercise 3---------------- */

/* -----------------------------------------
   Exercise 4
   -----------------------------------------

   Implement the function `findBookAuthors` which returns the `first_name` and
   `last_name` from the `authors` table, and the `title` of the
   books(from the `books` table) that the authors have written.

   @function: `findBookAuthors`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
   [{first_name: 'John', last_name: 'Worsley', title: 'Practical PostgreSQL'}
   {first_name: 'Paulette', last_name: 'Bourgeois', title: 'Franklin in the Dark'}
   {first_name: 'Margery Williams', last_name: 'Bianco', title: 'The Velveteen Rabbit'}
   {first_name: 'Louisa May', last_name: 'Alcott', title: 'Little Women'}
   {first_name: 'Stephen', last_name: 'King', title: 'The Shining'}
   {first_name: 'Frank', last_name: 'Herbert', title: 'Dune'}
   {first_name: 'Burne', last_name: 'Hogarth', title: 'Dynamic Anatomy'}
   {first_name: 'Margaret Wise', last_name: 'Brown', title: 'Goodnight Moon'}
   {first_name: 'Edgar Allen', last_name: 'Poe', title: 'The Tell-Tale Heart'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Learning Python'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Programming Python'}
   {first_name: 'Tom', last_name: 'Christiansen', title: 'Perl Cookbook'}
   {first_name: 'Arthur C.', last_name: 'Clarke', title: '2001: A Space Odyssey'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'Bartholomew and the Oobleck'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'The Cat in the Hat'}]
*/
// IMPLEMENT THIS FUNCTION

let findBookAuthors = db.any('select title, first_name, last_name from authors, books where authors.id = books.author_id')
.then(authors => {
  assert.deepEqual(authors.length, 15)
  assert.deepEqual(authors[0].first_name, 'John')
  assert.deepEqual(authors[13].title, 'Bartholomew and the Oobleck')
}).catch(error => {
  console.log("Messed up, oh no!", error)
});

/* --------End of Exercise 4---------------- */





/* -----------------------------------------
   Exercise 5
   -----------------------------------------

   Implement the function `authorIdWithTwoBooks` which returns the
   `author_id` of authors who have 2 books. (HINT: you have to use a SUBQUERY)

   @function: `authorIdWithTwoBooks`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
     [{author_id: 1809},
      {author_id: 7805}]

*/

 // IMPLEMENT THIS FUNCTION

let authorIdWithTwoBooks = db.any('select author_id from (select author_id, count(author_id) from (select authors.id, last_name, first_name, title, author_id from authors, books where authors.id = books.author_id)placeHolder group by author_id)secondPlaceholder where count >= 2')
.then(authors => {
  assert.deepEqual(authors.length, 2)
  assert.deepEqual(authors[0].author_id, '1809')
  assert.deepEqual(authors[1].author_id, '7805')
}).catch(error => {
  console.log('This is no good', error)
});

/* --------End of Exercise 5---------------- */

/* -----------------------------------------
   Exercise 6
   -----------------------------------------

   Implement the function `bookTitlesWithMultipleEditions` which returns the
   `title` of books which have more than 2 editions. (HINT: you have to use a join)

   @function: `bookTitlesWithMultipleEditions`
   @input params: None
   @output: [{title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
     [{title: 'The Shining'},
      {title: 'The Cat in the Hat'},
      {title: 'Dune'}
      {title: '2001: A Space Odyssey'}
      {title: 'The Tell-Tale Heart'}]

*/

// IMPLEMENT THIS FUNCTION

let bookTitlesWithMultipleEditions = db.any('select title from (select title, count(title) as total from books, editions where id = book_id group by title)placeHolder where total > 1')
.then(titles => {
  assert.deepEqual(titles.length, 5)
  assert.deepEqual(titles[0].title, 'The Shining')
  assert.deepEqual(titles[4].title, 'The Tell-Tale Heart')
}).catch(error => {
  console.log('Oh no, it didn\'t work!', error)
});

/* --------End of Exercise 6---------------- */




/* -----------------------------------------
   Exercise 7
   -----------------------------------------

   Implement the function `findStockedBooks` which returns the `title` & the
   author's `first_name` & `last_name` of all books which are stocked as
   represented in the `daily_inventory` table.

   @function: `findStockedBooks`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
   [ {first_name: 'Frank',  title: 'Dune', last_name: 'Herbert'},
     {title: 'The Cat in the Hat', first_name: 'Theodor Seuss', last_name: 'Geisel'}]

*/

// IMPLEMENT THIS FUNCTION

let findStockedBooks = db.any('select title, last_name, first_name from authors join books on authors.id = books.author_id where books.id in (select book_id from editions where isbn in (select isbn from daily_inventory where is_stocked = TRUE) group by book_id)')
.then(Books => {
  assert.deepEqual(Books.length, 2)
  assert.deepEqual(Books[0].title, 'Dune')
  assert.deepEqual(Books[1].title, 'The Cat in the Hat')
}).catch(error => {
  console.log('It didn\'t work', error)
})

/* --------End of Exercise 7---------------- */




console.log('Reached the end!');
pg.end();
