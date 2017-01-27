'use strict';

import React, {Component} from 'react';

function Avatar(props) {
    return (
        <img className="img-thumbnail"
                src={props.url}
                alt={props.name}
                width={props.width}
                height={props.height}
        />
    );
}

function LinkedName(props) {
    return (
        <span>
            <a href={props.profileUrl}>
                <h1>{props.children}</h1>
            </a>
        </span>
    );
}

function Tag(props) {
    return (
        <em>{props.children}</em>
    );
}

function UserTags(props) {
    return (
        <div>
            {
                props.tags.map(tag => {
                    return <Tag>{tag} • </Tag>
                })
            }
        </div>
    );
}

export {Avatar, LinkedName, UserTags}
