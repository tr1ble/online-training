import {
    withStyles,
  } from '@material-ui/core/styles';
  import { TextValidator} from 'react-material-ui-form-validator';

  const CssLightTextValidator = withStyles({
    root: {
      '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
      },
      '& .MuiInput-underline': {
        borderBottomColor: 'white',
      },
      '& .MuiInputBase-input': {
        width: '290px',
        color: 'white',
      },
      '& .MuiFormLabel-root': {
        color: '#f6e770',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextValidator);

  export default CssLightTextValidator;
