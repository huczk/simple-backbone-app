// View for one publisher in the list
var PublisherView = Backbone.View.extend({
  model: new Publisher(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.publishers-list-template').html());
  },
  events: {
    'click .edit': 'edit',
    'click .delete-modal': 'delete'
  },

  // Edit button redirect to edit view for this particular publisher
  edit: function() {
    window.location.hash = 'editPublisher/' + this.model.id;
  },

  // Deleting particular publisher.
  // After button clicked - modal is showing to user for confirming an action
  delete: function() {
    let self= this;
    $('.delete').click(function() {
      self.model.destroy({
        success: function(response) {
          $('.info').html('');
          $('.info').append(`<p class='alert alert-success'>Successfully delete publisher '${response.toJSON().name}'</p>`);
        },
        error: function() {
          $('.info').html('');
          $('.info').append('<p class="alert alert-danger list">Failed to delete publisher!</p>');
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

// View for publishers list container
let PublishersView = Backbone.View.extend({
  model: publishers,
  el: $('.lists'),
  initialize: function() {
    this.model.on('add', this.render, this);
    this.model.on('remove', this.render, this);

    // Fetching all publishers on initialize
    this.model.fetch({
      error: function() {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to get publishers!</p>`);
      }
    });
    this.render();
  },
  render: function() {
    var self = this;
    this.$el.html('');

    // Show table head for publishers table
    if (!$('.thead').length) {
      $('.table').append(`<thead class='thead'>
      <tr>
        <th>Name</th>
        <th>Year</th>
        <th><a class="btn btn-success" href="#addPublisher">Add Publisher</a></th>
      </tr>
    </thead>`);
    }
    _.each(this.model.toArray(), function(publisher) {
      self.$el.append((new PublisherView({model: publisher})).render().$el);
    });
    return this;
  }
});

// View for adding a new publisher
var AddPublisherPage = Backbone.View.extend({
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
    window.location.hash = 'publishers';
  },

  // Adding a new publisher. If validation errors - show them to user.
  add: function(e) {
    e.preventDefault();

    let data = {
      "name": $('#name').val(),
      "year": $('#year').val()
    };

    let publisher = new Publisher();
    publisher.save(data, {
      success: function(response) {
        $('.info').html('');
        $('.info').append(`<p class='alert alert-success'>Successfully save publisher '${response.toJSON().name}'</p>`);
      },
      error: function(err) {
        $('.info').html('');
        $('.info').append(`<ul class="alert alert-danger list">Failed to save publisher!</ul>`);
        err.map((item) => $('.list').append(`<li>${item}</li>`));
      }
    });
    return this;
  },
  render: function() {
    let template = _.template($('.form-publisher-template').html(), {});
    this.$el.html(template);
    return this;
  }
});

// View for editing a publisher
var EditPublisherPage = Backbone.View.extend({
  model: publishers,
  el: $('.formContainer'),

  // Fetch publisher by id to show it in the form for editing data
  initialize: function(options) {
    this.item = null;
    let self = this;
    this.model.fetch({
      success: function(response) {
        let publisher = response.find(function(model) {
          return model.toJSON().id == options.id;
        });
        self.item = publisher;
        self.render();
      },
      error: function() {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to get publishers!</p>`);
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
    window.location.hash = 'publishers';
  },

  // Update publisher data. If validation errors - show them to user.
  update: function(e) {
    e.preventDefault();
    let data = {
      "name": $('#name').val(),
      "year": $('#year').val(),
    };
    this.item.save(data, {
      success: function(response) {
        $('.info').html('');
        $('.info').append(`<p class='alert alert-success'>Successfully save publisher '${response.toJSON().name}'</p>`);
      },
      error: function(err) {
        $('.info').html('');
        $('.info').append(`<p class="alert alert-danger list">Failed to save publisher! ${err}</p>`);
      }
    });
    return this;
  },
  render: function() {
    let template = _.template($('.form-publisher-template').html(), {});
    this.$el.html(template);

    // Show current publisher data in a form
    $('#name').val(this.item.toJSON().name);
    $('#year').val(this.item.toJSON().year);
    return this;
  }
});
