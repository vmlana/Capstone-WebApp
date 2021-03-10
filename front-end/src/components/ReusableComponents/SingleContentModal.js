import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Backdrop, Slide, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SingleContentModal = ({ open, name, added }) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
      >
        <ModalContent>
          <p>{`${name} is`}</p>
          {added ? <p>added</p> : <p>removed</p>}
        </ModalContent>
      </Modal>
    </div>
  );
};

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

// const ContentList = styled.div`
//   display: flex;
//   justify-content: "space-between";
//   flex-wrap: wrap;
//   margin: 1rem 7rem;
// `;

// const ReactIcon = styled.div`
//   text-align: right;
// `;

export default SingleContentModal;
