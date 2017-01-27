import React, { Component } from 'react';
import {Avatar, LinkedName, UserTags} from './Components'

class Stat extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick({label: this.props.label})
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickStat = this.handleClickStat.bind(this);
    }

    handleClickStat(label) {
        console.log(label);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        let url = `https://api.github.com/users/${this.state.value}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(!data.message)
                    this.setState({user: data})
            })
            .catch(err => console.log(err))
        e.preventDefault();
    }

    render() {
        let {user} = this.state;
        if(user) {
            let {avatar_url, html_url, name, email} = user;
            let {login, followers, following} = user;
            let {public_gists, public_repos} = user;

            let stats = [
                {label: 'Followers', value: followers},
                {label: 'Following', value: following},
                {label: 'Repos', value: public_repos},
                {label: 'Gists', value: public_gists},
            ]

            return (
                <div>
                    <UserNameForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        value={this.state.value}
                    />
                    <div className="row">
                        <Avatar url={avatar_url} name={name} />
                        <div className="col-xs-12 col-sm-8">
                            <LinkedName profileUrl={html_url}>{name}</LinkedName>
                            <UserTags tags={[login, email]} />
                            <Stats data={stats} handler={this.handleClickStat}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <UserNameForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        value={this.state.value}
                    />
                </div>
            );
        }
    }
}



export default App;
