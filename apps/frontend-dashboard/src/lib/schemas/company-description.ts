import * as yup from 'yup';

export const companyDescriptionSchema = yup.object().shape({
	company: yup.string().required('Company name is required'),
	companyDescription: yup.string().required('Company description is required'),
	productOrService: yup.string().required('Product or service is required'),
});
