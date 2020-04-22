import theme from './theme';

export default {
  form: {
    textAlign: 'center'
  },
  image: {
    width: 80,
    margin: '20px auto'
  },
  pageTitle: {
    margin: '10px auto'
  },
  textField: {
    margin: '10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid' + theme.palette.primary.main,
    marginBottom: 20
  },
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      marginBottom: 20,
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  editProfileButton: {
    float: 'right'
  },
  deleteScreamButton: {
    position: 'absolute',
    top: '10%',
    left: '90%'
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeScreamDialogButton: {
    position: 'absolute',
    top: '1%',
    left: '85%'
  },
  screamDialogImage: {
    objectFit: 'cover', // If ratio is not 1:1 prevent image from stretching
    borderRadius: '50%',
    width: '100%'
  },
  dialogContent: {
    padding: 20
  },
  expandScreamButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover', // If ratio is not 1:1 prevent image from stretching
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  },
  skeletonCard: {
    display: 'flex',
    marginBottom: 20
  },
  skeletonCover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  skeletonContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  skeletonHandle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  skeletonDate: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    marginBottom: 10
  },
  skeletonFullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  },
  skeletonHalfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  },
  profileSkeletonHandle: {
    height: 18,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  }
};
