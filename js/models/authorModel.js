// Backbone model for an Author
var Author = Backbone.Model.extend({
  defaults: {
    fullName: "",
  },
  url: 'http://localhost:3000/authors',

  // Author validation - all model fields are required. If error - return it to a user.
  validate: function(attr, options) {
    let messages = [];

    if(!attr.fullName) {
      messages.push('All fields must be filled');
    }

    if (messages.length > 0) {
      options.error(messages);
      return messages;
    }
  },
});
