import React from 'react';
import {Circle, MapContainer, Marker, TileLayer, GeoJSON} from "react-leaflet";
import {divIcon} from "leaflet";


function mapItem(el) {
    return el.geoJson;
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        fetch('http://192.168.1.3:5000/building')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    items: data.map((el) => mapItem(el)),
                })
            })
            .catch(console.log);
    }

    render() {
        return (<MapContainer center={[50.037994, 19.921910]} zoom={13} scrollWheelZoom={false}
                              style={{height: '100vh', width: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*<Circle center={[50.037994, 19.921910]} radius={200} pathOptions={{color: 'blue'}}/>*/}

            {this.props.player_position.length === 0 ? <p/> :
                <Marker position={this.props.player_position} icon={divIcon({
                    className: 'empty',
                    html: '<svg><text x="0" y="16" fontSize="16">??🔫</text></svg>'
                })}/>
            }

            {this.state.items.map((el) => <GeoJSON key={el} data={el}/>)}
        </MapContainer>);
    }
}

export default Map;