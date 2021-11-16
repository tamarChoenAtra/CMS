/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import UATIcon from '@material-ui/icons/BugReport'
import PublishIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'
import UATDateIcon from '@material-ui/icons/Today'
import ChangeThemeIcon from '@material-ui/icons/Palette'
import ExportIcon from '@material-ui/icons/Description'
import PreviewIcon from '@material-ui/icons/Devices'
import InfoIcon from '@material-ui/icons/Info'
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import { DateTimePicker } from '@superup/ui'
import 'Assets/css/views/widgets/page-header.scss'
import Iphone from 'Assets/css/views/widgets/Iphone.svg'

const PageHeader = ({
  title,
  uatDate,
  setUatDate,
  onUATClick,
  onPublishClick,
  viewOnly,
  isLoading,
  buttons,
}) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false)

  return (
    <>
      <Grid
        container
        className="PageHeader"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={5}>
          <h1>{title}</h1>
        </Grid>
        <Grid item xs={12} sm={7} className="buttons-container">
          {buttons.length > 0 &&
            buttons !== undefined &&
            typeof buttons === 'object' &&
            buttons.map(button => {
              if (button.title === 'UAT') {
                return (
                  <Button
                    key={button.id}
                    variant="contained"
                    color="primary"
                    className={`headerButton ${button.className}`}
                    onClick={button.onClick}
                    disabled={button.disabled || isLoading}
                    classes={{
                      disabled: 'outline-button-disabled',
                    }}
                  >
                    <UATIcon className="button-icon" />
                    {button.title}
                  </Button>
                )
              }
              else if (button.title === 'Publish') {
                return (
                  <Button
                    key={button.id}
                    variant="contained"
                    color="primary"
                    className={`headerButton ${button.className}`}
                    onClick={button.onClick}
                    disabled={button.disabled || isLoading}
                    classes={{
                      disabled: 'outline-button-disabled',
                    }}
                  >
                    <PublishIcon className="button-icon" />
                    {button.title}
                  </Button>
                )
              }
              else if (button.title === 'Save') {
                if (button.package === 'look-and-feel') {
                  return (
                    <Button
                      key={button.id}
                      className={`headerButton ${button.className}`}
                      onClick={button.onClick}
                      disabled={button.disabled}
                      classes={{
                        disabled: 'no-outline-button-disabled',
                      }}
                    >
                      <SaveIcon className="button-icon" />
                      {button.title}
                    </Button>
                  )

                }
                else {
                  return (
                    <Button
                      key={button.id}
                      className={`headerButton ${button.className}`}
                      onClick={button.onClick}
                      disabled={button.disabled}
                      classes={{
                        disabled: 'no-outline-button-disabled',
                      }}
                    >
                      <SaveIcon className="button-icon" />
                      {button.title}
                    </Button>
                  )
                }
              }
              else if (button.title === 'Premade Theme') {
                return (
                  <Button
                    key={button.id}
                    className={`headerButton ${button.className}`}
                    onClick={button.onClick}
                    disabled={button.disabled}
                    classes={{
                      disabled: 'no-outline-button-disabled',
                    }}
                  >
                    <ColorLensIcon className="button-icon" />
                    {button.title}
                  </Button>
                )
              }
              else if (button.title === 'Save Theme') {
                return (
                  <Button
                    key={button.id}
                    className={`headerButton ${button.className}`}
                    onClick={button.onClick}
                    disabled={button.disabled}
                    classes={{
                      disabled: 'no-outline-button-disabled',
                    }}
                  >
                    <SaveIcon className="button-icon" />
                    {button.title}
                  </Button>
                )
              }
              else if (button.title === 'Change Theme') {
                return (
                  <Button
                    key={button.id}
                    className={`headerButton ${button.className}`}
                    onClick={button.onClick}
                    disabled={button.disabled}
                    classes={{
                      disabled: 'no-outline-button-disabled',
                    }}
                  >
                    <ChangeThemeIcon className="button-icon" />
                    {button.title}
                  </Button>
                )
              }
              else if (button.title === 'UAT Date') {
                return (
                  <div key={button.id} style={{ display: 'inline-block' }}>
                    <DateTimePicker
                      iconMode
                      label={button.title}
                      minDate={new Date()}
                      selected={uatDate}
                      dateFormat="dd-MM-yyyy"
                      showTimeSelect={false}
                      popperZIndex={260}
                      onChange={date => {
                        setUatDate(date)
                      }}
                      onClickSave={() => {
                        button.onClick()
                      }}
                    />
                  </div>
                )
              }
              else if (button.title === 'Export as .csv') {
                return (
                  <Button
                    key={button.id}
                    className={`headerButton ${button.className}`}
                    onClick={button.onClick}
                    disabled={button.disabled}
                    classes={{
                      disabled: 'no-outline-button-disabled',
                    }}
                  >
                    <ExportIcon className="button-icon" />
                    {button.title}
                  </Button>
                )
              }
              else if (button.title === 'Preview') {
                return (
                  <Button
                    key={button.id}
                    color="primary"
                    className={`headerButton ${button.className}`}
                    onClick={button.onClick}
                    disabled={button.disabled}
                    classes={{
                      disabled: 'no-outline-button-disabled',
                    }}
                  >
                    <PhonelinkRingIcon className="button-icon" />
                    {button.title}
                  </Button>
                )
              } else {
                return (
                  <h3>The buttons you tried to insert are not predefined.</h3>
                )
              }
            })}
        </Grid>
      </Grid>
    </>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onUATClick: PropTypes.func,
  onPublishClick: PropTypes.func,
  isLoading: PropTypes.bool,
}

PageHeader.defaultProps = {
  onUATClick: undefined,
  onPublishClick: undefined,
  isLoading: false,
}

export default PageHeader
