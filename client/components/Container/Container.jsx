import React, { Component } from 'react';

export class Container extends Component {
   state = {
      width: '',
      height: '',
   };

   componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.setState({
         width: window.innerWidth,
         height: window.innerHeight,
      });
   }

   handleResize = (e) => {
      console.log(e);
      this.setState({
         width: window.innerWidth,
         height: window.innerHeight,
      });
   };

   render() {
      const { children } = this.props;
      const { width, height } = this.state;

      return (
         <div
            style={{
               width,
               height,
            }}
         >
            {children}
         </div>
      );
   }
}

export default Container;
