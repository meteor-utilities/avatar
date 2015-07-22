
// We only to somethere here if React is being used by the project

if (Package.react) {
   
   // We create a React component that will also be extended (in export.js) to export the Avatar API.

   Avatar = React.createClass({

      mixins: [ReactMeteorData],

      getMeteorData() {

         // Get the user object, URL and initials (recall that this function we be reactively called if the user object changes)

         var user = (this.props.user) ? this.props.user : Meteor.users.findOne(this.props.userId);
         var initials = initialsText(user, this.props);
         var url = Avatar.getUrl(user);

         var newState = null;

         // If the intials have changed we'll need to update the state

         if (initials !== this.state.initialsText) {
            newState = { initialsText: initials }
         }

         // If the URL has changed then we ned to update the state with the new URL, and also (re)display the IMG tag

         if (this.state.url !== url.trim()) {

            newState = newState || {};
            newState.imgStyles = {};
            newState.url = url;

            // We try to load the new URL into another Image object.
            // If that fails then we'll hide the actually IMG tag by updating the state

            var img = new Image();
            img.onerror = () => { this.setState({ imgStyles: { display: 'none' } }) };
            img.src = url;
         }
      
         // Only change that state if something has changed, otherwise we get into an infinite loop since
         // getMeteorData() is called whenever the state changes

         if (newState)
            this.setState(newState);

         return {
            user: user
         }
      },

      getInitialState() {

         return {
            url: '',
            imgStyles: {},
            initialsText: ''
         }      
      },

      render() {

         var prefix = Avatar.getCssClassPrefix();
         var classes = [prefix, sizeClass(this.props), shapeClass(this.props), customClasses(this.props)].join(' ');

         var initialsStyles = {};
         if (this.props.bgColor) initialsStyles['backgroundColor'] = this.props.bgColor;
         if (this.props.txtColor) initialsStyles['color'] = this.props.txtColor;

         return (
            <div className={classes}>
               <img className={prefix + '-image'} src={this.state.url} style={this.state.imgStyles} />
               <span className={prefix + '-initials'} style={initialsStyles}>{this.state.initialsText}</span>
            </div>
         );
      }

   });
}