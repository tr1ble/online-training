import {
    withStyles,
  } from '@material-ui/core/styles';
  import { TextValidator} from 'react-material-ui-form-validator';

  const CssDarkTextValidator = withStyles({
    root: {
      '& .MuiInput-underline:before': {
        borderBottomColor: 'black',
      },
      '& .MuiInput-underline': {
        borderBottomColor: 'black',
      },
      '& .MuiInputBase-input': {
        width: '290px',
        color: 'black',
      },
      '& .MuiFormLabel-root': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
      },
    },
  })(TextValidator);

  export default CssDarkTextValidator;
