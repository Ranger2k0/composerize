import React, { Component } from 'react';
import Composerize from 'composerize';
import 'normalize.css';
import 'html5-boilerplate/dist/css/main.css';
import './App.css';

import Header from './components/Header';
import Entry from './components/Entry';
import Output from './components/Output';
import Footer from './components/Footer';

const defaultCommand =
    'docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            command: defaultCommand,
            compose: '',
            output: Composerize(defaultCommand),
        };
        this.onCommandInputChange = this.onCommandInputChange.bind(this);
        this.onComposeInputChange = this.onComposeInputChange.bind(this);
    }

    onComposeInputChange(value) {
        this.setState(state => ({
            compose: value,
            output: Composerize(state.command, value),
        }));
    }
    onCommandInputChange(value) {
        this.setState(state => ({
            command: value,
            output: Composerize(value, state.compose),
        }));
    }

    render() {
        return (
            <div>
                <Header />
                <Entry
                    command={this.state.command}
                    compose={this.state.compose}
                    onCommandInputChange={this.onCommandInputChange}
                    onComposeInputChange={this.onComposeInputChange}
                />
                <Output output={this.state.output} />
                <Footer />
            </div>
        );
    }
}
