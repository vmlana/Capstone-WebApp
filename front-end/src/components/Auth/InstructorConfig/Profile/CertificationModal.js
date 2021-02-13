import React from 'react'
import styled from "styled-components"
import { Modal, Backdrop, Slide, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))

const CertificationModal = ({ open, onClose }) => {

    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open}>
                    <ModalContent>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                    </ModalContent>
                </Slide>
            </Modal>
        </div>
    );
}

const ModalContent = styled.div`
    background-color: #fff;
    border: 1px solid #555;
    border-radius: 1rem;
    padding: 3rem;
    box-shadow: none;

    :focus {
        outline: none;
    }
`;

export default CertificationModal
