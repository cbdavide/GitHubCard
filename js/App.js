'use strict';

import React, { Component } from 'react';
import {sanitizeUrl} from './util';
import {Avatar, LinkedName, UserTags} from './Components';
import {UserList} from './User';
import List from './List'

class Stat extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick({
            label: this.props.label,
            url: this.props.url
        })
    }

    render() {
        return (
            <div onClick={this.handleClick}className="stat__item">
            <strong className="">{this.props.label}</strong>
            <span className="">{this.props.value}</span>
            </div>
        );
    }
}

function Stats(props) {
    return (
        <div className="stat">
            {props.data.map(stat => {
                return (<Stat key={stat.label}
                             label={stat.label}
                             value={stat.value}
                             url={stat.url}
                             handleClick={props.handler} />
                         );
            })}
        </div>
    );
}

function UserNameForm(props) {
    return (
        <form className="row" onSubmit={props.handleSubmit}>
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon3" >
                    https://github.com/
                </span>
                <input type="text"
                       className="form-control"
                       id="basic-url"
                       aria-describedby="basic-addon3"
                       placeholder="username"
                       value={props.value}
                       onChange={props.handleChange} />
           </div>
        </form>
    );
}

class UserCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {user} = this.props;
        let {avatar_url, html_url, name, email} = user;
        let {login, followers, following} = user;
        let {public_gists, public_repos} = user;
        let {followers_url, following_url, gists_url, repos_url} = user;

        let stats = [
            {label: 'Followers', value: followers, url: followers_url},
            {label: 'Following', value: following, url: following_url},
            {label: 'Repos', value: public_repos, url: repos_url},
            {label: 'Gists', value: public_gists, url: gists_url},
        ]

        return (
            <article className="row">
                <Avatar width="200px" height="200px" url={avatar_url} name={name} />
                <div className="col-xs-12 col-sm-8">
                    <LinkedName profileUrl={html_url}>{name}</LinkedName>
                    <UserTags tags={[login, email]} />
                    <Stats data={stats} handler={this.props.handleClickStat}/>
                </div>
            </article>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            user: undefined,
            list: undefined,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickStat = this.handleClickStat.bind(this);
    }

    handleClickStat(stat) {
        stat.url = sanitizeUrl(stat.url);
        fetch(stat.url)
            .then(res => {
                this.setState({
                    list: undefined
                })
                return res.json()
            })
            .then(data => {
                // console.log(data);
                this.setState({
                    list: {
                        data: data,
                        label: stat.label,
                        url: stat.url
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        let url = `https://api.github.com/users/${this.state.value}`
        fetch(url)
            .then(response => {
                this.setState({user: undefined})
                return response.json()
            })
            .then(data => {
                console.log(data)
                if(!data.message)
                    this.setState({user: data})
            })
            .catch(err => console.log(err))
        e.preventDefault();
    }
    render() {

        let userCard = '';
        let list = '';

        if(this.state.user){
            userCard = (
                <UserCard handleClickStat={this.handleClickStat}
                          user={this.state.user}/>
            )
        }

        if(this.state.list) {
            let {label, data} = this.state.list;
            list = <List label={label} data={data} />
        }

        return (
            <section>
                <UserNameForm
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    value={this.state.value}
                />
                {userCard}
                {list}
            </section>
        );
    }
}

export default App;
