import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../../api/endpoints/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const callSignUp = async (signUpData) => {
    try {
      const response = await signUp(signUpData);
      toast.success('Your data has been inserted successfully.');
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Sign Up failed. Please try again.');
      return { error: "Sign Up failed. Please try again." };
    }
  }

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    await callSignUp(values);
    setSubmitting(false);
    navigate('/logIn');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ getFieldProps, isSubmitting }) => (
        <Form className="flex flex-col gap-4 mb-20">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...getFieldProps('name')}
              className="w-full min-h-12 p-3 pl-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-base-color"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...getFieldProps('email')}
              className="w-full min-h-12 p-3 pl-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-base-color"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...getFieldProps('password')}
                className="w-full min-h-12 p-3 pl-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-base-color"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...getFieldProps('confirmPassword')}
                className="w-full min-h-12 p-3 pl-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-base-color"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div className="flex justify-between text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-base-color text-white py-3 font-semibold rounded-md hover:bg-second-color transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
