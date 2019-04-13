import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Card from '../Card/Card';
import List from '../List/List';
import classes from './Menu.css';
import { logoutUser } from '../../store/actions/authAction';

class Menu extends Component {
   constructor(props) {
      super(props);

      this.firstItemRef = React.createRef();
      this.lastItemRef = React.createRef();
   }

   componentDidMount() {
      this.firstItemRef.current.focus();
   }

   handleLogout = () => {
      const { closeDrawer, history, logoutUser } = this.props;

      logoutUser();
      closeDrawer();
      history.push('/login');
   };

   handleKeyDown = (event) => {
      const { onClose } = this.props;

      // タブキーの移動でフォーカスが外れたらメニューを閉じる
      if (
         (event.shiftKey && event.key === 'Tab' && event.target === this.firstItemRef.current)
         || (!event.shiftKey && event.key === 'Tab' && event.target === this.lastItemRef.current)
      ) {
         onClose();
      }

      // ログアウトメニュー上でエンターキーが押されたら
      // ログアウトでメニューを閉じる
      if (event.key === 'Enter') {
         this.handleLogout();
         onClose();
      }
   };

   render() {
      return (
         <Card className={classes.menu} size="bleed">
            <List role="menu">
               <List.Item
                  as={Link}
                  onKeyDown={this.handleKeyDown}
                  ref={this.firstItemRef}
                  role="menuitem"
                  tabIndex="0"
               >
                  設定
               </List.Item>
               <List.Item
                  onClick={this.handleLogout}
                  onKeyDown={this.handleKeyDown}
                  ref={this.lastItemRef}
                  role="menuitem"
                  tabIndex="0"
               >
                  ログアウト
               </List.Item>
            </List>
         </Card>
      );
   }
}

const { func, shape } = PropTypes;

Menu.propTypes = {
   closeDrawer: func.isRequired,
   history: shape({
      push: func.isRequired,
   }).isRequired,
   logoutUser: func.isRequired,
   onClose: func.isRequired,
};

const actions = {
   logoutUser,
};

export default withRouter(
   connect(
      null,
      actions,
   )(Menu),
);
