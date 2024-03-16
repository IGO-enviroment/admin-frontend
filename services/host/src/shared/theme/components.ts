import { Components, Theme } from '@mui/material/styles';

export const components: Components<Omit<Theme, 'components'>> = {
    MuiButton: {
        defaultProps: {
            disableElevation: true,
            variant: 'contained'
        }
    },
    MuiPaper: {
        defaultProps: {
            elevation: 0
        }
    },
    MuiList: {
        defaultProps: {
            disablePadding: true
        }
    },
    MuiListItem: {
        defaultProps: {
            disablePadding: true
        }
    }
};
