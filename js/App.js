import React, { Component } from 'react';

function Avatar(props) {
    return (<img className="col-xs-12 col-sm-4 img-thumbnail"
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
                <h1>{props.children}</h1>
            </a>
        </div>
    );
}

function Stat(props) {
    return (
        <div className="stat">
            <strong className="">{props.label}</strong>
            <span className="">{props.value}</span>
        </div>
    );
}

function Stats(props) {
    return (
        <div className="">
            {props.data.map(stat => {
                return (<Stat key={stat.label}
                             label={stat.label}
                             value={stat.value} />
                         );
            })}
        </div>
    );
}

function UserName(props) {
    let children = props.children.split(' ');
    if(children[1] === "null") {
        console.log('here');
        return <div><em>{children[0]}</em></div>
    } else {
        return (
            <div>
            <em>{children[0]}</em> • <em>{children[1]}</em>
            </div>
        );
    }
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
                            <Name profileUrl={html_url}>{name}</Name>
                            <UserName>{`${login} ${email}`}</UserName>
                            <Stats data={stats} />
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
