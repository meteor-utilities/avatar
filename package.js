Package.describe({
  name: "utilities:avatar",
  summary: "Consolidated user avatar template (twitter, facebook, gravatar, etc.)",
  version: "0.9.1",
  git: "https://github.com/meteor-utilities/avatar"
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.4.1', 'METEOR@1.1.0.1']);
  api.use(['templating', 'reactive-var'], ['client']);
  api.use(['underscore', 'jparker:gravatar@0.3.1'], ['client', 'server']);
  api.use(['meteorhacks:inject-initial@1.0.2'], ['server']);

  // IMPORTANT:
  //
  // React support is being removed from this project for the time being. The latest updates to Meteor and
  // the React package have made the build unstable, and despite my best efforts I haven't been able to
  // create a single solution that works with both apps that use and don't use React.
  //
  // This will be revisited once Meteor 1.2 is out, or else a separate React fork may be considered.
  //
  // To add support for React we can need to weak link to it so that it's not uncessarily included
  // However we have to force the inclusion of the jsx compiler otherwise our jsx files aren't included.
  // Since JSX is only used when compiling and it isn't delivered to clients this isn't an issue, even for
  // those who aren't using React in their project.

  // api.use('jsx@0.1.5');
  // api.use('react@0.1.7', { weak: true });
  // api.use('react-meteor-data@0.1.5');

  api.addFiles(
    [
      'blaze/avatar.html',
      'blaze/avatar.js',
    ],
    ['client']
  );
  api.addFiles(
    [
      // 'react/avatar.jsx',
      'utils.js',
      'helpers.js',
      'export.js'
    ],
    ['client', 'server']
  );

  api.addAssets(
    [
    'default.png'
    ],
    ['client', 'server']
  );

  api.export('Avatar');
});
