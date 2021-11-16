import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import 'Views/widgets/MessagePopUp/MessagePopupStyle.scss'

const MessagePopUp = ({
  openPopUp,
  closeAction,
  popUpMessage,
  buttonText,
  buttonAction,
}) => {
  return (
    <Dialog
      open={openPopUp}
      onClose={closeAction}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: 'main-dialog',
      }}
    >
      <DialogContent>
        <DialogTitle
          id="alert-dialog-title"
          classes={{ root: 'popup-title' }}
          disableTypography
        >
          {popUpMessage}
        </DialogTitle>
      </DialogContent>
      <DialogActions
        classes={{
          spacing: 'popup-buttons',
        }}
      >
        <div className="popup-buttons">
          <Button
            variant="contained"
            onClick={buttonAction}
            classes={{
              contained: 'popup-button',
              label: 'popup-button-label',
            }}
            autoFocus
          >
            {buttonText}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default MessagePopUp
