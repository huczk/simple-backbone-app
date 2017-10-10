// Backbone router for all views
let MyRouter = Backbone.Router.extend({
  routes: {
    "": "booksPage",
    "books": "booksPage",
    "addBook": "addBookPage",
    "editBook/(:id)": "editBookPage",
    "authors": "authorsPage",
    "addAuthor": "addAuthorPage",
    "editAuthor/(:id)": "editAuthorPage",
    "publishers": "publishersPage",
    "addPublisher": "addPublisherPage",
    "editPublisher/(:id)": "editPublisherPage"
  },
  booksPage: function() {
    $('.info').html('');
    $('.thead').remove();
    $('.formContainer').html('');;
    new BooksView();
  },
  authorsPage: function() {
    $('.info').html('');
    $('.thead').remove();
    $('.formContainer').html('');;
    new AuthorsView();
  },
  publishersPage: function() {
    $('.info').html('');
    $('.thead').remove();
    $('.formContainer').html('');;
    new PublishersView();
  },
  addBookPage: function() {
    $('.info').html('');
    $('.lists').html('');
    $('.thead').html('');
    new AddBookPage();
  },
  addAuthorPage: function() {
    $('.info').html('');
    $('.lists').html('');
    $('.thead').html('');
    new AddAuthorPage();
  },
  addPublisherPage: function() {
    $('.info').html('');
    $('.lists').html('');
    $('.thead').html('');
    new AddPublisherPage();
  },
  editBookPage: function(id) {
    $('.info').html('');
    $('.lists').html('');
    $('.thead').html('');
    new EditBookPage({ id: id });
  },
  editAuthorPage: function(id) {
    $('.info').html('');
    $('.lists').html('');
    $('.thead').html('');
    new EditAuthorPage({ id: id });
  },
  editPublisherPage: function(id) {
    $('.info').html('');
    $('.lists').html('');
    $('.thead').html('');
    new EditPublisherPage({ id: id });
  }
});

let router = new MyRouter();
Backbone.history.start();
