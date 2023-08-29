import { useNavigate } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";

type ConfirmDeleteModalProps = {
    show: boolean;
    onHide: () => void;
    onDelete: (id: string) => void;
    id: string;
    title: string;
}

export default function ConfirmDeleteModal({ show, onHide, onDelete, id, title }: ConfirmDeleteModalProps) {

    const navigate = useNavigate();

    return (
        <Modal show={show} centered>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete <mark style={{ fontWeight: "bold" }}>{title}</mark> note ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    onDelete(id);
                    onHide();
                    navigate("/");
                }}>
                    Delete
                </Button>
                <Button variant="outline" style={{ borderColor: "teal", color: "teal" }} onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
