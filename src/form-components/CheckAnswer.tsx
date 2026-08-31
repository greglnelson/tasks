import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function CheckAnswer({
    expectedAnswer,
}: {
    expectedAnswer: string;
}): React.JSX.Element {
    const [givenAnswer, setGivenAnswer] = useState<string>("");
    return (
        <div>
            <h3>Check Answer</h3>
            <Form.Group controlId="checkAnswer">
                <Form.Label>Answer:</Form.Label>
                <Form.Control
                    value={givenAnswer}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setGivenAnswer(event.target.value);
                    }}
                />
            </Form.Group>
            <div>{givenAnswer === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}
