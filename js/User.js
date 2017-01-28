'use strict';

import React, {Component} from 'react';
import {Avatar, LinkedName} from './Components'

function UserItem(props) {
    return (
        <article className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <Avatar width="75px" height="75px" url={props.avatar_url} name={props.children}/>
            <LinkedName profileUrl={props.html_url}>{props.children}</LinkedName>
        </article>
    );
}

function UserList(props) {
    return (
        <section className="row">
            {
                props.items.map(user => {
                    return (
                        <UserItem key={user.id} avatar_url={user.avatar_url} profileUrl={user.html_url}>
                            {user.login}
                        </UserItem>
                    )
                })
            }
        </section>
    );
}

export {UserList};
