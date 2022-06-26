import React from 'react';
import MovementTable from './control/movement-table';
import Map from './map';
import OwnershipTable from './control/ownership-table';


class UI extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayerPositionChange = this.handlePlayerPositionChange.bind(this);
        this.state = {
            player_position: [1, 1],
        };
    }

    handlePlayerPositionChange(position) {
        this.setState({
            player_position: position,
        });
    }

    componentDidMount() {
        fetch('http://192.168.1.3:5000/player')
            .then(res => res.json())
            .then((data) => {
                this.setState({player_position: data.pos})
            })
            .catch(console.log);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-xl-4">
                            <div className="row">
                                <MovementTable onChange={this.handlePlayerPositionChange}/>
                            </div>
                            <hr/>
                            <div className="row">
                                <OwnershipTable/>
                            </div>
                            <hr/>
                            <div className="row">
                                {/*{{production_table}}*/}
                            </div>
                            <hr/>
                            <div className="row">
                                {/*{{interaction_table}}*/}
                            </div>
                            <hr/>
                        </div>
                        <div className="col-lg-8 col-xl-8">
                            <Map player_position={this.state.player_position}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UI;