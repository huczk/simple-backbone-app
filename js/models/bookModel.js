// Backbone model for a Book
var Book = Backbone.Model.extend({
  defaults: {
		author: '',
	  title: '',
		isbn: '',
		publisher: '',
		year: ''
	},
  url: 'http://localhost:3000/books',
  
  // Book validation. If validation error - return it to a user.
  // All model fields are required. Year of a book can not be higher than current year.
  // ISBN must be a Number and be 13 charaters long (if user pass ISBN with dashes - delete them).
  validate: function(attr, options) {
    let messages = [];

    if(!attr.author || !attr.title || !attr.isbn || !attr.publisher || !attr.year) {
      messages.push('All fields must be filled');
    }

    let isbn = attr.isbn.replace(/-/g, "");
    if(isbn.length !== 13) messages.push('ISBN must be 13 digits long');

    let isNum = /^\d+$/.test(isbn);
    if(!isNum) messages.push('ISBN must be a number');

    if (attr.year > new Date().getFullYear()) messages.push('Year can not be higher than current year');

    if (messages.length > 0) {
      options.error(messages);
      return messages;
    }
  },
});
