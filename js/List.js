'use strict';

import React, {Component} from 'react';
import {UserList} from './User';

function List(props) {
    if(props.label === 'Followers' || props.label === 'Following') {
        return <UserList items={props.data} />;
    } else {
        return <h1>Perrito :) </h1>;
    }
}

export default List;
