'use strict';

import React, {Component} from 'react';
import {Avatar, LinkedName} from './Components'

function UserItem(props) {
    return (
        <article>
            <Avatar url={props.avatar_url} name={props.children}/>
            <LinkedName profileUrl={props.html_url}>{props.children}</LinkedName>
        </article>
    );
}

function UserList(props) {
    return (
        <Section>
            {
                props.items.map(user => {
                    return (
                        <UserItem key={user.id} url={user.avatar_url} profileUrl={user.html_url}>
                            {user.login}
                        </UserItem>
                    )
                })
            }
        </Section>
    );
}

export {UserList};
