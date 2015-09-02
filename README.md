![logo](https://s3.amazonaws.com/f.cl.ly/items/1u233B1J332D393D2m2j/avatar-logo.png)
================================================================================

Consolidated Avatar Template Package for Meteor
-----------------------------------------------

ANNOUNCEMENT
------------

This package has been forked from @bengott's original Avatar package since it is longer maintained. It's been added to the *utilities* collection so that it can henceforth be maintained by other community members.

BREAKING CHANGES
----------------

As of version 0.9.0 the React support that was added to version 0.8.0 has been removed. The latest updates to Meteor and the React package have made the build unstable, and despite my best efforts I haven't been able to create a single solution that works with both apps that use and don't use React. Days have been lost trying to solve the issues, and this has stopped me from publishing other updates. This situation will be revisited at a later stage, or else a separate React fork may be considered. In the meantime you'll need to use the Blaze template within your React code.

In version 0.7.14 and earlier the Avatar options were overridden by assigning them directly to `Avatar.options`. You should no longer do this. Instead, you must call `Avatar.setOptions()` and pass the options that you wish to override.

The template parameters were overhauled in version 0.5.0. The `Avatar.options` object changed quite a bit in version 0.6.0 too. And make sure you note the `defaultType`/`fallbackType` changes in version 0.7.0. Basically, things are still in a state of flux (pre-1.0.0), so check for breaking changes and read the rest of the README carefully when you update the package.


Installation
------------
In your Meteor project directory, run:
```shell
$ meteor add utilities:avatar
```
Of course, you also need to add the accounts-<service> packages for the services you're using (e.g. accounts-twitter) and accounts-ui or something similar in order to add login functionality to your app.

Usage
-----
In an HTML file:
```handlebars
{{> avatar (user=<user> || userId=<userId>)
           (size="large" || "small" || "extra-small" || <user-defined size>)
           (shape="rounded" || "circle")
           (class="some custom classes")
           (initials="<initials>") (bgColor="<color>") (txtColor="<color>") }}
```

In a React component:
```jsx
<Avatar (user=<user> || userId=<userId>)
        (size="large" || "small" || "extra-small" || <user-defined size>)
        (shape="rounded" || "circle")
        (class="some custom classes")
        (initials="<initials>") (bgColor="<color>") (txtColor="<color>") />
```

That may look like a lot of options, but they are all optional. Most of the time, your HTML will look more like this:
```handlebars
{{> avatar user=this shape="circle"}}
```

Optional template parameters:
  - `user` or `userId`: Either a user object or userId string, default avatar if omitted
  - `size`: Size of the avatar, by default either "large" (80px), "small" (30px), or "extra-small" (20px), although these may be overridden and new ones defined. If no size is provided 50px is used.
  - `shape`: Used for CSS border-radius property, either "rounded" or "circle", square if omitted
  - `class`: Any custom CSS classes you'd like to define on the avatar container. The string is passed straight through to the `class` attribute on the `div` container element.
  - `initials`: Specify the initials to show for the initials avatar. The package automatically tries to determine the user's initials from profile data, but if defined, this param will override that.
  - `bgColor` and `txtColor`: Override the default colors for the initials avatar (color name or hex value string).

Global Configuration Options
----------------------------
The package exports a global `Avatar` object which has a property named `options` (also an object). The default options provided can be overridden by calling `Avatar.setOptions()` and passing in the options that you wish to override.

***Note that `Avatar.setOptions()` must be called in both server and client code.***

  - `fallbackType`: Determines the type of fallback to use when no image can be found via linked services (Gravatar included):
    - "default image" (the default option, which will show either the image specified by defaultImageUrl, the package's default image, or a Gravatar default image).
      OR
    - "initials" (show the user's initials)
  - `defaultImageUrl`: This will replace the included package default image URL ("packages/avatar/default.png"). It can be a relative path (e.g. "images/defaultAvatar.png").
  - `gravatarDefault`: Gravatar default option to use (overrides defaultImageUrl option and included package default image URL). Options are available [here](https://secure.gravatar.com/site/implement/images/#default-image).
  - `emailHashProperty`: This property on the user object will be used for retrieving gravatars (useful when user emails are not published).
  - `customImageProperty`: If you're storing images URLs in a property on the user object, you can specify it here.
  - `cssClassPrefix`: This property is used to prefix the CSS classes of the DOM elements generated by this package.
  - `imageSizes`: This property defines the avatar sizes that are available to your project
  - `backgroundColor`: The background color for initials avatars (color name or hex value string or a function). The default is gray (`"#AAA"`). Assign your own background color scheme by passing a function that take only one argument, the `user` instance and return a CSS compatible color code e.g. "#123abc".
  - `textColor`: The text color for initials avatars (color name or hex value string or a function). The default is white (`"#FFF"`). Assign your own text color scheme by passing a function that take only one argument, the `user` instance and return a CSS compatible color code e.g. "#123abc".


Example usage:
- To show initials when no avatar image can be found via linked services:
```javascript
Avatar.setOptions({
  fallbackType: "initials"
});
```

- To show the included package default image, you don't need to specify any options because this is the default functionality. However, you could specify it explicitly like so:
```javascript
Avatar.setOptions({
  fallbackType: "default image"
});
```
- To show a custom default image:
```javascript
Avatar.setOptions({
  defaultImageUrl: "img/default-avatar.png" OR "http://example.com/default-avatar.png"
});
```
  ***Note that Gravatar's default option requires a publicly accessible URL, so it won't work when your app is running on localhost and you're using either the included package default image or a custom defaultImageUrl that is a relative path. It will work fine once deployed though.***

- To show one of Gravatar's default options (e.g. "identicon"):
```javascript
Avatar.setOptions({
  gravatarDefault: "identicon"
});
```
  ***Note that gravatarDefault overrides defaultImageUrl and the included package default image.***

- Set a value to the `cssClassPrefix` to avoid conflicts in CSS class names. Setting the property value like this:
```javascript
Avatar.setOptions({
  cssClassPrefix: 'foo'
});
```
Will assign CSS class names prefixed by 'foo', like below:
```html
<div class="foo foo-small foo-circle">
    <img class="foo-image" src="path_to_your_avatar" alt="avatar" onerror="this.style.display='none';" width="30" height="30">
    <span class="foo-initials">A</span>
</div>
```
If a `cssClassPrefix` is not set, then the default prefix 'avatar' is used for CSS class names in the rendered the HTML:
```html
<div class="avatar avatar-small avatar-circle">
    <img class="avatar-image" src="path_to_your_avatar" alt="avatar" onerror="this.style.display='none';" width="30" height="30">
    <span class="avatar-initials">A</span>
</div>
```

- If your app does not publish the user.emails object/property but publishes an email hash property instead, you can specify it like this (the Gravatar package generates a hash internally when you give it an email too; this just allows you to decouple those two steps so as not to make all your users' emails public):
```javascript
Avatar.setOptions({
  emailHashProperty: "email_hash"
});
```
  ***Note that you can use `Avatar.hash("address@email.com");` to generate a Gravatar email hash.***

- You may override the default avatar sizes, or create new ones, by overriding the `imageSizes` option:
```javascript
Avatar.setOptions({
  imageSizes: {
    'large': 80,
    'mySize': 40
  }  
});
```

- To use a custom coloring scheme for the initials, first write a function that implements your coloring scheme, then assign that to the `backgroundColor` option:
```javascript
var customColorScheme = function (user) {
  if (user.profile.name === "Red")
    return "#ff0000";
  else if (user.profile.name === "Green")
    return "#00ff00";
  else
    return "#aaaaaa";
};

Avatar.setOptions({
  backgroundColor: customColorScheme,
});
```

How the package chooses an avatar
---------------------------------
Given a user object or userId string, Avatar will retrieve the user's image with the following priority:
  1. The user object's custom image URL (stored in the property defined by `Avatar.options.customImageProperty`)
  2. Twitter
  3. Facebook
  4. Google
  5. GitHub
  6. Instagram
  7. Linkedin
  8. Gravatar, which will try to return an avatar matching the user's email address/hash. If it can't find one, then:
    - If `Avatar.options.fallbackType` is "initials", Gravatar returns a 404 (Not Found) response.
    - Else,
      - If `Avatar.options.gravatarDefault` is valid, Gravatar will return a default image (e.g. an identicon).
      - If `Avatar.options.gravatarDefault` is invalid or undefined, Gravatar will return either the image referenced by `Avatar.options.defaultImageUrl` or the included default image.
  9. If no image can be retrieved, the user's initials will be shown.

**Required Fields/Properties on the User Object**

Since fields in `user.services` contain security info, it's often wise to restrict access to those in publications, e.g.:
```javascript
UsersCollection.find({ /* query */ }, {
  fields: {
    //...
    "services.facebook.id" : true
    //...
  }
});
```

Fields used to get avatar image (one per service):
```javascript
"services.twitter.profile_image_url_https"
"services.facebook.id"
"services.google.picture"
"services.github.username"
"services.instagram.profile_picture"
"services.linkedin.pictureUrl"
```

Fields used to form initials (if needed):
```javascript
 "profile.firstName"
 "profile.lastName"
 "profile.familyName"
 "profile.secondName"
 "profile.name"
```

**Linked Services/Accounts:**
By default, the Meteor accounts system creates a separate user account for each service you login with. In order to merge those accounts together, you'd need to use a package like [accounts-meld](https://atmospherejs.com/splendido/accounts-meld) or [link-accounts](https://atmospherejs.com/bozhao/link-accounts). In the future, the plan is to add UI to allow the user to select which avatar they want to use and/or upload their own image.

Credits
-------
- [Sacha Greif](https://github.com/SachaG), for [suggesting the idea on crater.io](http://crater.io/posts/BfMsgzs5AzEdp6Byu)
- [Shai Alon](https://github.com/shaialon), for [contributing the Gravatar functionality to Telescope](https://github.com/TelescopeJS/Telescope/pull/436) that [I later modified](https://github.com/TelescopeJS/Telescope/pull/438)
- [Jérémie Parker](https://github.com/p-j), for providing the [gravatar package](https://github.com/p-j/meteor-gravatar)
- [Everyone who has contributed](https://github.com/meteor-utilities/avatar/graphs/contributors) to this project. :)
