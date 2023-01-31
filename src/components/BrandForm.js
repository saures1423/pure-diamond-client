import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BrandStateContext } from '../context/BrandStateContext';
import { useCreateBrand, useEditBrand, useGetLastID } from '../hooks/query/brand';

function BrandForm() {
	const queryClient = useQueryClient();
	const { globalState, edit, setEdit, lastID } = useContext(BrandStateContext);

	const { data: brandLastID } = useGetLastID();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: { BrandID: '', BrandName: '', IsActive: 'Yes' },
	});

	const { mutate, isLoading } = useCreateBrand({
		onSuccess: () => {
			reset();
			queryClient.invalidateQueries(['lastID']);
			setValue('BrandID', brandLastID?.lastID[0]?.AUTO_INCREMENT);
			toast.success('New brand name has been added.');
		},
	});

	const { mutate: update, isLoading: editLoading } = useEditBrand({
		onSuccess: (data) => {
			if (Object.keys(data).length === 0) return;

			console.log(
				'🚀 ~ file: BrandForm.js:44 ~ BrandForm ~ data?.lastID[0]?.AUTO_INCREMENT',
				brandLastID?.lastID[0]?.AUTO_INCREMENT
			);

			setEdit(false);
			reset();
			setValue('BrandID', brandLastID?.lastID[0]?.AUTO_INCREMENT);
			toast.success('Brand has been updated.');
		},
	});

	const watchId = watch('BrandID');

	useEffect(() => {
		if (edit) {
			setValue('BrandName', globalState?.BrandName);
			setValue('IsActive', globalState?.IsActive);
			setValue('BrandID', globalState?.BrandID);
		}
	}, [edit, globalState?.BrandID, globalState?.BrandName, globalState?.IsActive, setValue]);

	useEffect(() => {
		setValue('BrandID', brandLastID?.lastID[0]?.AUTO_INCREMENT);
	}, [brandLastID?.lastID, setValue]);

	const onSubmit = (data) => {
		delete data?.BrandID;
		mutate(data);
	};
	const onUpdate = (data) => {
		if (edit) {
			update({ watchId, ...data });
		}
	};

	// if (true) {
	// 	return (
	// 		<Spinner animation="border" role="status">
	// 			<span className="visually-hidden">Loading...</span>
	// 		</Spinner>
	// 	);
	// }

	return (
		<Form
			className="d-grid gap-2  p-2 bg-light border"
			onSubmit={handleSubmit(edit ? onUpdate : onSubmit)}
		>
			<Form.Group className="mb-3">
				<Form.Label>BRAND ID</Form.Label>
				<Form.Control
					type="text"
					aria-label="Disabled input example"
					readOnly
					{...register('BrandID')}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>BRAND NAME</Form.Label>
				<Form.Control
					type="text"
					placeholder={'Enter Brand Name'}
					{...register('BrandName', { required: true })}
				/>
				{errors?.BrandName && (
					<Form.Text className="text-danger">
						All fields are required. Please ensure all fields are completed
					</Form.Text>
				)}
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Active</Form.Label>
				<Form.Select {...register('IsActive')}>
					<option>Yes</option>
					<option>No</option>
				</Form.Select>
			</Form.Group>

			{isLoading || editLoading === true ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				<Button variant="primary" type="submit">
					{edit ? 'UPDATE' : 'ADD'}
				</Button>
			)}

			{edit && (
				<Button
					variant="danger"
					type="button"
					onClick={() => {
						reset();
						setEdit(false);
						setValue('BrandID', brandLastID?.lastID[0]?.AUTO_INCREMENT);
					}}
					style={{ display: editLoading ? 'none' : 'initial' }}
				>
					Cancel
				</Button>
			)}
		</Form>
	);
}

export default BrandForm;
