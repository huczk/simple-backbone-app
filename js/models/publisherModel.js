// Backbone model for a Publisher
var Publisher = Backbone.Model.extend({
  defaults: {
    name: "",
    year: ""
  },
  url: 'http://localhost:3000/publishers',
  
  // Publisher validation. If validation error - return it to a user.
  // All model fields are required and year of publisher can not be higher than current year.
  validate: function(attr, options) {
    let messages = [];

    if(!attr.name || !attr.year) {
      messages.push('All fields must be filled');
    }

    if (attr.year > new Date().getFullYear()) messages.push('Year can not be higher than current year');

    if (messages.length > 0) {
      options.error(messages);
      return messages;
    }
  },
});
