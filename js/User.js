'use strict';

import React, {Component} from 'react';
import {Avatar, LinkedName} from './Components'

function UserItem(props) {
    return (
        <li>
            <Avatar width="100px" height="100px" url={props.avatar_url} name={props.children}/>
            <LinkedName profileUrl={props.html_url}>{props.children}</LinkedName>
        </li>
    );
}

function UserList(props) {
    return (
        <ul>
            {
                props.items.map(user => {
                    return (
                        <UserItem key={user.id} avatar_url={user.avatar_url} profileUrl={user.html_url}>
                            {user.login}
                        </UserItem>
                    )
                })
            }
        </ul>
    );
}

export {UserList};
