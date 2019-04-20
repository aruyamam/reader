import React from 'react';
import PropTypes from 'prop-types';
import classes from './Loading.css';
import List from '../../../helper/List';

const sizes = {
   small: 'small',
   medium: 'medium',
   large: 'large',
};

const Loading = ({ size }) => {
   const classList = new List(classes.loading);
   let loaderSize = size;

   // sizeプロップをチェック
   if (!Object.keys(sizes).includes(size)) {
      loaderSize = sizes.medium;
   }

   // サイズに見合ったCSSのクラスを追加
   classList.add(classes[loaderSize]);

   return <div className={classList.strList} />;
};

Loading.defaultProps = {
   size: 'medium',
};

Loading.propTypes = {
   size: PropTypes.string,
};

export default Loading;
