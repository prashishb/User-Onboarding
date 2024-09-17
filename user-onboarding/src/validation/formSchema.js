import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  email: yup
    .string()
    .email('Email address must be valid')
    .required('Email address required'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(8, 'Password must be 8 characters long')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
  role: yup
    .string()
    .oneOf(
      [
        'Project Manager',
        'Product Lead',
        'Team Lead',
        'Tech Lead',
        'Full-Stack Developer',
        'Back-End Developer',
        'Front-End Developer',
        'QA Lead',
        'QA Engineer',
        'UI Designer',
        'UX Designer',
      ],
      'Position required'
    ),
  tos: yup.boolean(),
});

export default formSchema;
