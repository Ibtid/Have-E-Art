import React from 'react';
import ShowCaseContainer from '../../components/MyCollection/ShowCaseContainer/ShowCaseContainer';
import ComponentWithSideBar from '../../layouts/ComponentWithSideBar';

const MyCollection = (props) => {
  return (
    <ComponentWithSideBar>
      <ShowCaseContainer>{props.children}</ShowCaseContainer>
    </ComponentWithSideBar>
  );
};

export default MyCollection;
