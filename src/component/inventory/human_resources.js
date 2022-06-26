import React from 'react';
import Table from './table';

// short = '{} {}'.format(el.base_icon, el.last_name)
// skills = ['{} {}'.format(s.type, s.level) for s in sorted(el.skills, key=lambda s: s.level, reverse=True)]
// if not el.available:
//     skills.insert(0, 'UNAVAILABLE')
// long = '<br/>'.join(skills)
// title = '{} {}'.format(el.first_name, el.last_name)
// people.append({'short': short, 'long': long, 'title': title, 'unavailable': not el.available})

function mapItem(el) {
    let short = `${el.base_icon} ${el.last_name}`;
    let long = el.skills.sort((s1, s2) => s2.level - s1.level).map(s => `${s.type} ${s.level}`);
    let title = `${el.first_name} ${el.last_name}`;
    let unavailable = !el.available;
    return {short: short, long: long, title: title, unavailable: unavailable};
}

class HumanResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        fetch('http://192.168.1.3:5000/person/hr')
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

export default HumanResources;