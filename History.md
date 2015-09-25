### 0.9.2

- Added option to NOT push the generated CSS into the head
- Use the right URL for the default avatar

### 0.9.1

- Meteor 1.2 compatibility upgrade

### 0.9.0

- React support has had to be removed for the time being. Please see the README for more details
- Added the ability to specify a function that returns the backgroud/foreground colors for a given avatar
- The correct path is now used the default Avatar

### 0.8.0

- Added support for rendering with React (if it's being used by the project)
- Exported a `hash` function to for creating Gravatar-compatible hashes to store in the user object
- Added options to provide the default background/text colors for avatars that display initials

### 0.7.15

- **IMPORTANT:** There is now an `Avatar.setOptions()` method which must be used to override the default options (rather than just assigning to `Avatar.options` directly).
- Provided an option to override the default Avatar sizes and to create new ones.
- The CSS is now generated on the server based on the current options, so it's no longer necessary to provide your own CSS if you've customised the CSS prefix using the option that was introduced in version 0.7.13.


### 0.7.14

- Updated repo URL.

### 0.7.13

- Added custom CSS prefix option (thanks @raiyankamal!)

### 0.7.12

- Cleaned up getServices (thanks @gwendall!)
- Only remove 'display' if url changes (thanks @rodrigok!)

### 0.7.11

- Added LinkedIn support (thanks @raiyankamal!)

### 0.7.10

### 0.7.9

- Adding `customImageProperty` option for storing avatars on a custom user property.
- Refactored `getServices`.
- Started using `getDescendantProp` instead of assuming properties are stored on the `user.profile` object.
- Added roadmap.
- Changed package name to `utilities:avatar`.
- Changed logo to the only “Avatar” that matters.
