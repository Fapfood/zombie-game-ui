import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

// <button type="button" className="btn btn-secondary" data-toggle="popover" data-placement="bottom"
//         data-trigger="focus" data-content={item.long} title={item.title}
//         style={{width: '100%', height: '100%',}}>
//     {/*{% if item.unavailable %} background-color:red;{% endif %}*/}
//     {item.short}
// </button>

function splitArrayIntoChunksOfLen(arr, len) {
    let chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

function mapItem(el) {
    let short = `${el.icon} ${el.type}`;
    let long1 = `\u{2b50} ${el.quality}`;
    let long2 = `\u{1f480} ${el.decay}`;
    let title = el.type;
    let unavailable = !el.available;
    return {'short': short, 'long1': long1, 'long2': long2, 'title': title, 'unavailable': unavailable};
}

class Production extends React.Component {
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
        return (
            <table
                style={{
                    textAlign: 'center',
                    width: '100%',
                    tableLayout: 'fixed',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                }}
                align='center'>
                {splitArrayIntoChunksOfLen(this.state.items, 4).map((items) => <InventoryRow items={items}/>)}
            </table>
        );
    }
}

function InventoryRow(props) {
    const items = props.items;
    return (
        <tr style={{width: '100%', height: '100%'}}>
            {items.map((item) => <InventoryCell item={item}/>)}
        </tr>
    );
}

function InventoryCell(props) {
    const item = mapItem(props.item);

    const popover = (
        <Popover id='popover-basic'>
            <Popover.Title as='h3'>{item.title}</Popover.Title>
            <Popover.Content>{item.long1}<br/>{item.long2}</Popover.Content>
        </Popover>
    );

    return (
        <td
            style={{
                width: '100%',
                height: '100%',
                border: '1px solid black',
                borderRadius: '5px',
                mozBorderRadius: '5px',
            }}
            colSpan="1">
            <OverlayTrigger trigger='focus' placement='bottom' overlay={popover}>
                <Button style={{width: '100%', height: '100%',}} variant='success'>{item.short}</Button>
            </OverlayTrigger>
        </td>
    );
}

export default Production;