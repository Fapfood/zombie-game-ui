import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';


function splitArrayIntoChunksOfLen(arr, len) {
    let chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

function Table(props) {
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
            {splitArrayIntoChunksOfLen(props.items, 4).map((items) => <Row items={items} mapItem={props.mapItem}/>)}
        </table>
    );
}

function Row(props) {
    return (
        <tr style={{width: '100%', height: '100%'}}>
            {props.items.map((item) => <Cell item={item} mapItem={props.mapItem}/>)}
        </tr>
    );
}

function Cell(props) {
    const item = props.mapItem(props.item);

    const popover = (
        <Popover id='popover-basic'>
            <Popover.Title as='h3'>{item.title}</Popover.Title>
            <Popover.Content>
                {item.long.map((el) => <div>{el}<br/></div>)}
            </Popover.Content>
        </Popover>
    );

    let variant;
    if (item.unavailable) {
        variant = 'danger';
    } else {
        variant = 'success';
    }

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
                <Button style={{width: '100%', height: '100%',}} variant={variant}>{item.short}</Button>
            </OverlayTrigger>
        </td>
    );
}

// <button type="button" className="btn btn-secondary" data-toggle="popover" data-placement="bottom"
//         data-trigger="focus" data-content={item.long} title={item.title}
//         style={{width: '100%', height: '100%',}}>
//     {/*{% if item.unavailable %} background-color:red;{% endif %}*/}
//     {item.short}
// </button>

export default Table;