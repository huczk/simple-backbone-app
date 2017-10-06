// View for one author in the list
var AuthorView = Backbone.View.extend({
  model: new Author(),
	tagName: 'tr',
	initialize: function() {
    this.model.on('remove', this.render, this);
		this.template = _.template($('.authors-list-template').html());
	},
  events: {
		'click .edit': 'edit',
		'click .delete-modal': 'delete'
	},

  // Edit button redirect to edit view for this particular author
	edit: function() {
    window.location.hash = 'editAuthor/' + this.model.id;
	},

  // Deleting particular author.
  // After button clicked - modal is showing to user for confirming an action
	delete: function() {
    let self = this;
    $('.delete').click(function() {
      self.model.destroy({
        wait: true,
  			success: function(response) {
          $('.info').html('');
          $('.info').append(`<p class='alert alert-success'>Successfully deleted author '${response.toJSON().fullName}'</p>`);
  			},
  			error: function() {
          $('.info').html('');
          $('.info').append('<p class="alert alert-danger list">Failed to delete author!</p>');
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

// View for authors list container
let AuthorsView = Backbone.View.extend({
	model: authors,
	el: $('.lists'),
	initialize: function() {
		this.model.on('add', this.render, this);
		this.model.on('remove', this.render, this);

    // Fetching all authors on initialize
		this.model.fetch({
			error: function() {
        $('.info').html('');
        $('.info').append('<p class="alert alert-danger list">Failed to get authors!</p>');
			}
		});
    this.render();
	},
	render: function() {
		var self = this;
		this.$el.html('');

    // Show table head for authors table
		if (!$('.thead').length) {
			$('.table').append(`<thead class='thead'>
			<tr>
				<th>Name</th>
				<th><a class="btn btn-success" href="#addAuthor">Add Author</a></th>
			</tr>
		</thead>`);
		}
		_.each(this.model.toArray(), function(author) {
			self.$el.append((new AuthorView({model: author})).render().$el);
		});
		return this;
	}
});

// View for adding a new author
var AddAuthorPage = Backbone.View.extend({
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
    window.location.hash = 'authors';
	},

  // Adding a new author. If validation errors - show them to user.
  add: function(e) {
    e.preventDefault();

    let data = {
      "fullName": $('#fullName').val()
    };

    let author = new Author();
    author.save(data, {
			success: function(response) {
        $('.info').html('');
        $('.info').append(`<p class='alert alert-success'>Successfully save author '${response.toJSON().fullName}'</p>`);
			},
			error: function(err) {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to save author! ${err}</p>`);
			}
		});

    return this;
	},
	render: function() {
    let template = _.template($('.form-author-template').html(), {});
		this.$el.html(template);
		return this;
	}
});

// View for editing a author
var EditAuthorPage = Backbone.View.extend({
  model: authors,
	el: $('.formContainer'),
	initialize: function(options) {
    this.item = null;
    let self = this

    // Fetch author by id to show it in the form for editing data
    this.model.fetch({
      success: function(response) {
        let author = response.find(function(model) {
          return model.toJSON().id == options.id;
        });
        self.item = author;
        self.render();
      },
      error: function() {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to save author! ${err}</p>`);
      }
    });
	},
	events: {
		'click .submit': 'update',
    'click .back': 'back'
	},

  // User can go back by clicking back button
  back: function(e) {
    e.preventDefault();
    window.location.hash = 'authors';
	},

  // Update author data. If validation errors - show them to user.
	update: function(e) {
    e.preventDefault();
    let data = {
      "fullName": $('#fullName').val(),
    };
    this.item.save(data, {
			success: function(response) {
        $('.info').html('');
        $('.info').append(`<p class='alert alert-success'>Successfully save author '${response.toJSON().fullName}'</p>`);
			},
			error: function(err) {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to save author! ${err}</p>`);
			}
    });
  },
	render: function() {
    let template = _.template($('.form-author-template').html(), {});
		this.$el.html(template);

    // Show current author data in a form
    $('#fullName').val(this.item.toJSON().fullName);
		return this;
	}
});
