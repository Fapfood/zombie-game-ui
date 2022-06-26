import React from "react";
import Row from "./row";


class MovementTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
        this.handleMoveUpLeft = this.handleMoveUpLeft.bind(this);
        this.handleMoveUp = this.handleMoveUp.bind(this);
        this.handleMoveUpRight = this.handleMoveUpRight.bind(this);
        this.handleMoveLeft = this.handleMoveLeft.bind(this);
        this.handleIdle = this.handleIdle.bind(this);
        this.handleMoveRight = this.handleMoveRight.bind(this);
        this.handleMoveDownLeft = this.handleMoveDownLeft.bind(this);
        this.handleMoveDown = this.handleMoveDown.bind(this);
        this.handleMoveDownRight = this.handleMoveDownRight.bind(this);
        this.postMove = this.postMove.bind(this);
        this.state = {x: 0, y: 0, position: []};
    }

    handleMove(direction) {
        switch (direction) {
            case 'u':
                this.postMove('n');
                this.setState({x: this.state.x - 1});
                break;
            case 'ul':
                this.postMove('nw');
                this.setState({x: this.state.x - 1, y: this.state.y - 1});
                break;
            case 'ur':
                this.postMove('ne');
                this.setState({x: this.state.x - 1, y: this.state.y + 1});
                break;
            case 'd':
                this.postMove('s');
                this.setState({x: this.state.x + 1});
                break;
            case 'dl':
                this.postMove('sw');
                this.setState({x: this.state.x + 1, y: this.state.y - 1});
                break;
            case 'dr':
                this.postMove('se');
                this.setState({x: this.state.x + 1, y: this.state.y + 1});
                break;
            case 'l':
                this.postMove('w');
                this.setState({y: this.state.y - 1});
                break;
            case 'r':
                this.postMove('e');
                this.setState({y: this.state.y + 1});
                break;
            case 'i':
                this.setState({x: 0, y: 0});
                break;
            default:
                break;
        }
    }

    postMove(direction) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({direction: direction})
        };
        fetch('http://192.168.1.3:5000/player', requestOptions)
            .then(response => response.json())
            .then(data => this.props.onChange(data.pos));
    }

    handleMoveUpLeft() {
        this.handleMove('ul');
    }

    handleMoveUp() {
        this.handleMove('u');
    }

    handleMoveUpRight() {
        this.handleMove('ur');
    }

    handleMoveLeft() {
        this.handleMove('l');
    }

    handleIdle() {
        this.handleMove('i');
    }

    handleMoveRight() {
        this.handleMove('r');
    }

    handleMoveDownLeft() {
        this.handleMove('dl');
    }

    handleMoveDown() {
        this.handleMove('d');
    }

    handleMoveDownRight() {
        this.handleMove('dr');
    }

    render() {
        return (
            <table style={{textAlign: 'center', width: '100%', tableLayout: 'fixed'}} align="center">
                <a>{this.state.x},{this.state.y}</a>
                <Row first={{id: 'f1', name: '🡤', handleClick: this.handleMoveUpLeft}}
                     second={{id: 'up', name: '🡡', handleClick: this.handleMoveUp}}
                     third={{id: 'f1', name: '🡥', handleClick: this.handleMoveUpRight}}/>
                <Row first={{id: 'left', name: '🡠', handleClick: this.handleMoveLeft}}
                     second={{id: 'f1', name: '⥁', handleClick: this.handleIdle}}
                     third={{id: 'right', name: '🡢', handleClick: this.handleMoveRight}}/>
                <Row first={{id: 'f1', name: '🡧', handleClick: this.handleMoveDownLeft}}
                     second={{id: 'down', name: '🡣', handleClick: this.handleMoveDown}}
                     third={{id: 'f1', name: '🡦', handleClick: this.handleMoveDownRight}}/>
            </table>

        );
    }
}

export default MovementTable;