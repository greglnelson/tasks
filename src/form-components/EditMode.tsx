import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function EditMode(): React.JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>("Your Name");
    const [student, setStudent] = useState<boolean>(true);
    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Check
                type="switch"
                id="edit-mode-switch"
                label="Edit Mode"
                checked={editing}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEditing(event.target.checked);
                }}
            />
            {editing ?
                <div>
                    <Form.Group controlId="editModeName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setName(event.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Check
                        type="checkbox"
                        id="edit-mode-student"
                        label="Is a student"
                        checked={student}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            setStudent(event.target.checked);
                        }}
                    />
                </div>
            :   <div>
                    {name} {student ? "is a student" : "is not a student"}
                </div>
            }
        </div>
    );
}
