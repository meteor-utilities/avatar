Template.avatar.helpers({

  cssClassPrefix: function () {
    return Avatar.getCssClassPrefix();
  },

  size: function () {
    // Defaults are 'large', 'small', 'extra-small', but user can add new ones
    return Avatar.options.imageSizes[this.size] ? Avatar.getCssClassPrefix() + '-' + this.size : '';
  },

  shape: function () {
    var valid = ['rounded', 'circle'];
    return _.contains(valid, this.shape) ? Avatar.getCssClassPrefix() + '-' + this.shape : '';
  },

  class: function () { return this.class; },

  imageUrl: function () {
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    var url = Avatar.getUrl(user);
    if (url && url.trim() !== '' && Template.instance().firstNode) {
      var img = Template.instance().find('img');
      if (img.src !== url.trim()) {
        img.style.removeProperty('display');
      }
    }
    return url;
  },

  initialsCss: function () {
    var css = '';
    if (this.bgColor)  css += 'background-color: ' + this.bgColor + ';';
    if (this.txtColor) css += 'color: ' + this.txtColor + ';';
    return css;
  },

  initialsText: function () {
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    return this.initials || Avatar.getInitials(user);
  }

});
