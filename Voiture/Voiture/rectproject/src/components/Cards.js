import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
function Cards(props) {
    return (
        <>
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={'http://127.0.0.1:8000/uploads/car/' + props.image} height="200px" />
                <Card.Body>
                    <Card.Title className="text-center">{props.name}</Card.Title>
                    <Card.Text className="text-center">{props.mark}</Card.Text>
                    <Card.Text className="text-center" >{props.number}</Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button variant="primary">Voir</Button>
                        {props.user&&<Button variant="success"> {props.comments.length} Commentes</Button>}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
export default Cards;