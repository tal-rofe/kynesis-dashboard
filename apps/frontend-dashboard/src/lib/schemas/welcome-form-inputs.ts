import * as yup from 'yup';

export const welcomeFormInputsSchema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	companyLinkedInURL: yup.string().url('Company linkedin URL must be a valid URL').optional(),
});
