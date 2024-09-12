import {
  useSnackbar as useNotistackSnackbar,
  VariantType,
  OptionsObject,
  SnackbarMessage,
} from 'notistack';

// Define the type for the showSnackbar function
type ShowSnackbar = (
  message: SnackbarMessage,
  variant?: VariantType,
  options?: OptionsObject,
) => void;

// type BaseVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  // Define the function with proper types
  const showSnackbar: ShowSnackbar = (
    message,
    variant = 'default',
    options = {},
  ) => {
    enqueueSnackbar(message, { variant, ...options });
  };

  return { showSnackbar };
};

export default useSnackbar;
