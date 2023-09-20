import { useState } from "react";
import { Dialog, Pane } from "evergreen-ui";

const modal = ({ title, confirmLabel, buttonText, isShown, setIsShown, children }) => {
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title={title}
        onCloseComplete={() => setIsShown(false)}
        preventBodyScrolling
        confirmLabel={confirmLabel}
      >
        {children}
      </Dialog>
      <button onClick={() => setIsShown(true)}>{buttonText}</button>
    </Pane>
  );
};

export default modal;
