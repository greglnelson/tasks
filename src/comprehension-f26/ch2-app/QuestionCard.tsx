import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

/**
 * The component the Chapter 2 comprehension exercises ask you about.
 * Read it carefully. Do not change it.
 */
export function QuestionCard(): React.JSX.Element {
    return (
        <div>
            <h3>Sample Question</h3>
            <img src="logo192.png" alt="The React logo" />
            <ul>
                <li>First option</li>
                <li>Second option</li>
                <li>Third option</li>
            </ul>
            <Button>Log Hello World</Button>
            <Container>
                <Row>
                    <Col>
                        <div
                            data-testid="left-box"
                            style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: "red",
                            }}
                        ></div>
                    </Col>
                    <Col>
                        <div
                            data-testid="right-box"
                            style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: "red",
                            }}
                        ></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
