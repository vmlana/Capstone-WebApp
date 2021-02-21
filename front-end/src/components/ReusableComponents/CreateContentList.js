import React, { useState } from "react";

import ContentListModal from "./ContentListModal";
import InputWithLabel from "../ReusableElement/InputWithLabel";
import Picker from "../ReusableElement/Picker";
import Button from "../ReusableElement/Button";

const CreateContentList = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>EDIT PLAYLIST </h1>
      <p>
        Get started adding videos to your list. We will post after reviewing the
        content.
      </p>
      <div>
        <InputWithLabel label={"Playlist Name"} />
        <Picker label={"Category"} />
        <Picker label={"Level"} />
        <Button
          text={"See available Lessons"}
          type={"modal"}
          onClick={handleOpen}
        />
        <ContentListModal open={open} close={handleClose} type={"playlist"} />
      </div>
    </div>
  );
};

export default CreateContentList;
