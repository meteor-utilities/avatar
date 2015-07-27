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
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    var css = '';

    var backgroundColorProperty = 'background-color: ';
    if (this.bgColor) backgroundColorProperty += this.bgColor;
    else backgroundColorProperty += Avatar.getBackgroundColor(user);
    css += backgroundColorProperty + ';';

    var textColorProperty = 'color: ';
    if (this.txtColor) textColorProperty += this.txtColor;
    else textColorProperty += Avatar.getTextColor(user);
    css += textColorProperty + ';';

    return css;
  },

  initialsText: function () {
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    return initialsText(user, this);
  }

});
