import { CheckboxProps, withStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { red } from "@material-ui/core/colors";
import React from "react";

const RedCheckbox = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default RedCheckbox;