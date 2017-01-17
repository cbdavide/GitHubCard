import React, { Component } from 'react';
import './App.css';

function Avatar(props) {
    return (<img className="picture"
                src={props.url}
                alt={props.name}
                width="200"
                height="200"
            />);
}

function Name(props) {
    return (
        <div>
            <a href={props.profileUrl}>
                <strong>{props.children}</strong>
            </a>
        </div>
    );
}

function Stat(props) {
    return (
        <div className="stat">
            <strong className="label">{props.label}</strong>
            <span className="value">{props.value}</span>
        </div>
    );
}

function UserName(props) {
    return <div><em>{props.children}</em></div>;
}

class UserNameForm extends Component{
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <input placeholder="username"
                       value={this.props.value}
                       onChange={this.props.handleChange}
                       type="text" />
                <input type="submit" value="buscar" />
            </form>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        let url = `https://api.github.com/users/${this.state.value}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Here')
                console.log(data)
                this.setState({user: data})
            })
            .catch(err => console.log(err))
        e.preventDefault();
    }

    render() {
        let {user} = this.state;
        if(user) {
            let {avatar_url, html_url, name} = user;
            let {login, followers, following} = user;
            let {public_gists, public_repos} = user;

            return (
                <div>
                <UserNameForm
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    value={this.state.value}
                />
                <Avatar url={avatar_url} name={name} />
                <Name profileUrl={html_url}>{name}</Name>
                <UserName>{login}</UserName>
                <Stat label="Followers" value={followers}/>
                <Stat label="Following" value={following}/>
                <Stat label="Repos" value={public_repos}/>
                <Stat label="Gists" value={public_gists}/>
                </div>
            );
        } else {
            return (
                <div>
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
