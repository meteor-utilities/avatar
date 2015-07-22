Template.avatar.helpers({

  cssClassPrefix: function () {
    return Avatar.getCssClassPrefix();
  },

  size: function () {
    return sizeClass(this);
  },

  shape: function () {
    return shapeClass(this)
  },

  class: function () {
    return customClasses(this);
  },

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
    return initialsText(user, this);
  }

});
