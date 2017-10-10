// View for one book in the list
var BookView = Backbone.View.extend({
  model: new Book(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.books-list-template').html());
  },
  events: {
    'click .edit': 'edit',
    'click .delete-modal': 'delete'
  },

  // Edit button redirect to edit view form for this particular book
  edit: function() {
    window.location.hash = 'editBook/' + this.model.id;
  },

  // Deleting particular book.
  // After button clicked - modal is showing to user for confirming an action
  delete: function() {
    let self = this;
    $('.delete').click(function() {
      self.model.destroy({
        success: function(response) {
          $('.info').html('');
          $('.info').append(`<p class='alert alert-success'>Successfully deleted book '${response.toJSON().title}'</p>`);
        },
        error: function() {
          $('.info').html('');
          $('.info').append(`<p class="alert alert-danger list">Failed to delete book</p>`);
        }
      });
      $('#myModal').modal('hide');
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// View for books list container
var BooksView = Backbone.View.extend({
  model: books,
  el: $('.lists'),
  initialize: function() {
    this.model.on('add', this.render, this);
    this.model.on('remove', this.render, this);

    // Fetching all books on initialize
    this.model.fetch({
      error: function() {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to get books</p>`);
      }
    });
    this.render();
  },
  render: function() {
    var self = this;
    this.$el.html('');

    // Show table head for books table
    if (!$('.thead').length) {
      $('.table').append(`<thead class='thead'>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>ISBN</th>
        <th>Publisher</th>
        <th>Year</th>
        <th><a class="btn btn-success" href="#addBook">Add Book</a></th>
      </tr>
    </thead>`);
    }
    _.each(this.model.toArray(), function(book) {
      self.$el.append((new BookView({model: book})).render().$el);
    });
    return this;
  }
});

// View for adding a new book
var AddBookPage = Backbone.View.extend({
  el: $('.formContainer'),
  initialize: function() {
    this.render();
  },
  events: {
    'click .submit': 'add',
    'click .back': 'back'
  },

  // User can go back by clicking back button
  back: function(e) {
    e.preventDefault();
    window.location.hash = 'books';
  },

  // Adding a new book. If validation errors - show them to user.
  add: function(e) {
    e.preventDefault();

    let data = {
      "author": $('#author').val(),
      "title": $('#title').val(),
      "isbn": $('#isbn').val(),
      "publisher": $('#publisher').val(),
      "year": $('#year').val()
    };

    let book = new Book();
    book.save(data, {
      success: function(response) {
        $('.info').html('');
        $('.info').append(`<p class='alert alert-success'>Successfully save book '${response.toJSON().title}'</p>`);
      },
      error: function(err) {
        $('.info').html('');
        $('.info').append('<ul class="alert alert-danger list">Failed to save book!</ul>');
        err.map((item) => $('.list').append(`<li>${item}</li>`));
      }
    });
    return this;
  },
  render: function() {
    let template = _.template($('.add-book-template').html(), {});
    this.$el.html(template);
    return this;
  }
});

// View for editing a book
var EditBookPage = Backbone.View.extend({
  model: books,
  el: $('.formContainer'),

  // Fetch book by id to show it in the form for editing data
  initialize: function(options) {
    this.item = null;
    let self = this
    this.model.fetch({
      success: function(response) {
        let book = response.find(function(model) {
          return model.toJSON().id == options.id;
        });
        self.item = book;
        self.render();
      },
      error: function() {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to get book</p>`);
      }
    });
  },
  events: {
    'click .submit': 'update',
    'click .back': 'back',
  },

  // User can go back by clicking back button
  back: function(e) {
    e.preventDefault();
    window.location.hash = 'books';
  },

  // Update book data. If validation errors - show them to user.
  update: function(e) {
    e.preventDefault();
    let data = {
      "author": $('#author').val(),
      "title": $('#title').val(),
      "isbn": $('#isbn').val(),
      "publisher": $('#publisher').val(),
      "year": $('#year').val(),
    };
    this.item.save(data, {
      success: function(response) {
        $('.info').html('');
        $('.info').append(`<p class='alert alert-success'>Successfully saved book '${response.toJSON().title}'</p>`);
      },
      error: function() {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to save book</p>`);
      }
    });
    return this;
  },
  render: function() {
    let template = _.template($('.add-book-template').html(), {});
    this.$el.html(template);

    // Show current book data in a form
    $('#author').val(this.item.toJSON().author);
    $('#title').val(this.item.toJSON().title);
    $('#isbn').val(this.item.toJSON().isbn);
    $('#publisher').val(this.item.toJSON().publisher);
    $('#year').val(this.item.toJSON().year);
    return this;
  }
});
