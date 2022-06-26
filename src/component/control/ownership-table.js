import React from "react";
import Row from "./row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Inventory from "../inventory/inventory";
import HumanResources from "../inventory/human_resources";


class OwnershipTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            type: '',
        };
    }

    handleShow(type) {
        this.setState({
            show: true,
            type: type,
        });
    }

    handleClose() {
        this.setState({show: false});
    }


    render() {
        let body;
        let title;
        if (this.state.type == 'inventory') {
            body = <Inventory/>;
            title = 'Inventory';
        } else {
            body = <HumanResources/>;
            title = 'Human Resources';
        }

        return (
            <>
                <table style={{textAlign: 'center', width: '100%', tableLayout: 'fixed'}} align="center">
                    <Row first={{id: 'f1', name: 'Inventory', handleClick: () => this.handleShow('inventory')}}
                         second={{id: 'f2', name: 'Human Resources', handleClick: () => this.handleShow('hr')}}/>
                </table>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default OwnershipTable;