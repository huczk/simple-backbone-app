// Backbone Collections
var BooksCollection = Backbone.Collection.extend({
	url: 'http://localhost:3000/books'
});

var AuthorsCollection = Backbone.Collection.extend({
	url: 'http://localhost:3000/authors'
});

var PublishersCollection = Backbone.Collection.extend({
	url: 'http://localhost:3000/publishers'
});

// Instantiate a Collections
var books = new BooksCollection();
var authors = new AuthorsCollection();
var publishers = new PublishersCollection();
