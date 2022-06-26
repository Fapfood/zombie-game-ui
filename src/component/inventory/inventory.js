import React from 'react';
import Table from './table';

// short = '{} {}'.format(el.icon, el.type)
// long = '&#x2B50; {}</br>&#x1F480; {}'.format(el.quality, el.decay)
// title = '{}'.format(el.type)
// inventory.append({'short': short, 'long': long, 'title': title, 'unavailable': not el.available})

function mapItem(el) {
    let short = `${el.icon} ${el.type}`;
    let long = [`\u{2b50} ${el.quality}`, `\u{1f480} ${el.decay}`];
    let title = el.type;
    let unavailable = !el.available;
    return {short: short, long: long, title: title, unavailable: unavailable};
}

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        fetch('http://192.168.1.3:5000/resource/inventory')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    items: data,
                })
            })
            .catch(console.log)
    }

    render() {
        return <Table items={this.state.items} mapItem={mapItem}/>;
    }
}

export default Inventory;