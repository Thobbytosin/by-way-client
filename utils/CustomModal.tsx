import { Box, Modal } from "@mui/material";
import React, { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: any;
};

const CustomModal: FC<Props> = ({ open, setOpen, component: Component }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[450px] min-h-[200px] bg-white dark:bg-slate-800 rounded-lg">
        <Component />
      </Box>
    </Modal>
  );
};

export default CustomModal;
