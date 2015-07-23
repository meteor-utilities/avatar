
// We only do somethere here if React is being used by the project

if (Package.react) {
   
   // We create a React component that will also be extended (in export.js) to export the Avatar API.

   Avatar = React.createClass({

      mixins: [ReactMeteorData],

      getMeteorData() {

         // Get the user object, URL and initials (recall that this function we be reactively called if the user object changes)

         var user = (this.props.user) ? this.props.user : Meteor.users.findOne(this.props.userId);
         var initials = initialsText(user, this.props);
         var url = Avatar.getUrl(user);
         
         // If the URL has changed then we need to update the state with the new URL, and also (re)display the IMG tag

         if (this.data.url !== url.trim()) {


            if (url == "") {
               this.setState({hideAvatar: true})
            }
            else {
               
               // We try to load the new URL into another Image object.
               // If that fails then we'll hide the actual IMG tag by updating the state

               var img = new Image();
               img.onerror = () => {
                  if (this.isMounted()) {
                     this.setState({ hideAvatar: true });
                  }
               }

               img.src = url;
               this.setState({hideAvatar: false})
            }
         }

         return {
            user: user,
            url: url,
            initialsText: initials
         }
      },

      getInitialState() {
         return {
            hideAvatar: false,
         }      
      },

      render() {

         var prefix = Avatar.getCssClassPrefix();
         var classes = [prefix, sizeClass(this.props), shapeClass(this.props), customClasses(this.props)].join(' ');

         var imgStyles = {}
         if (this.state.hideAvatar) imgStyles['display'] = 'none'
 
         var initialsStyles = {};
         if (this.props.bgColor) initialsStyles['backgroundColor'] = this.props.bgColor;
         if (this.props.txtColor) initialsStyles['color'] = this.props.txtColor;
  
         return (
            <div className={classes}>
               <img className={prefix + '-image'} src={this.data.url} style={imgStyles} />
               <span className={prefix + '-initials'} style={initialsStyles}>{this.data.initialsText}</span>
            </div>
         );
      }

   });
}