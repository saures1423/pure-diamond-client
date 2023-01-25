import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BrandStateContext } from '../context/BrandStateContext';
import { useGetAllBrands } from '../hooks/query/brand';
import { useEditItem, usePostItem } from '../hooks/query/item';

const ModalForm = () => {
	const { globalState, edit, setEdit, lastID } = useContext(BrandStateContext);

	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			ItemID: '',
			ItemName: '',
			BrandID: '',
			ItemPrice: '',
			ItemUOM: 'Pc',
			MinStock: '',
			ReorderQty: '',
			IsActive: 'Yes',
		},
	});

	const { data } = useGetAllBrands();

	const { mutate, isLoading: addIsLoading } = usePostItem({
		onSuccess: () => {
			handleClose();
			toast.success('New inventory item has been added.');
		},
	});

	const { mutate: update, isLoading: editIsLoading } = useEditItem({
		onSuccess: (data) => {
			if (Object.keys(data).length === 0) return;
			handleClose();
			reset();
			// setValue('BrandID', lastID);
			toast.success('Inventory item has been updated.');
		},
	});

	const watchId = watch('ItemID');

	useEffect(() => {
		if (edit) {
			setValue('ItemID', globalState?.ItemID);
			setValue('ItemName', globalState?.ItemName);
			setValue('BrandID', globalState?.BrandID);
			setValue('ItemPrice', globalState?.ItemPrice);
			setValue('ItemUOM', globalState?.ItemUOM);
			setValue('MinStock', globalState?.MinStock);
			setValue('ReorderQty', globalState?.ReorderQty);
			setValue('IsActive', globalState?.IsActive);
			handleShow();
		}
	}, [
		edit,
		globalState?.BrandID,
		globalState?.IsActive,
		globalState?.ItemID,
		globalState?.ItemName,
		globalState?.ItemPrice,
		globalState?.ItemUOM,
		globalState?.MinStock,
		globalState?.ReorderQty,
		setValue,
	]);

	useEffect(() => {
		setValue('ItemID', lastID);
	}, [lastID, setValue]);

	// if (isLoading) {
	// 	return <h3>Loading</h3>;
	// }
	const handleClose = () => {
		setShow(false);
		setEdit(false);
		reset();
		setValue('ItemID', lastID);
	};

	const onSubmit = (data) => {
		delete data?.ItemID;

		mutate(data);
	};

	const onUpdate = (data) => {
		if (edit) {
			update({ watchId, ...data });
		}
	};

	return (
		<>
			<Button variant="primary" size="large" type="submit" onClick={handleShow}>
				ADD NEW ITEM
			</Button>

			<Modal
				size="lg"
				aria-labelledby="example-modal-sizes-title-lg"
				show={show}
				onHide={handleClose}
			>
				<Form className="d-grid gap-2" onSubmit={handleSubmit(edit ? onUpdate : onSubmit)}>
					<Modal.Header closeButton>
						<Modal.Title>{edit ? 'UPDATE ITEM' : 'ADD NEW ITEM'}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Item ID</Form.Label>
										<Form.Control
											type="text"
											aria-label="Disabled input example"
											readOnly
											{...register('ItemID')}
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Item UOM</Form.Label>
										<Form.Select {...register('ItemUOM', { required: true })}>
											<option>Pc</option>
											<option>Pack/2s</option>
											<option>Pack/24s</option>
											<option>Box/10s</option>
										</Form.Select>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Item Name</Form.Label>
										<Form.Control
											type="text"
											placeholder={'Enter Item Name'}
											{...register('ItemName', { required: true })}
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Min. Stock</Form.Label>
										<Form.Control
											type="number"
											placeholder={'Enter Min. Stock'}
											{...register('MinStock', { required: true })}
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Select Brand Name</Form.Label>
										<Form.Select {...register('BrandID', { required: true })}>
											{data?.map((brand, i) => (
												<option key={i} value={brand?.BrandID}>
													{brand?.BrandName}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Reorder Qty</Form.Label>
										<Form.Control
											type="number"
											placeholder={'Enter Reorder Qty'}
											{...register('ReorderQty', { required: true })}
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Item Price</Form.Label>
										<Form.Control
											type="number"
											step=".01"
											placeholder={'Enter Item Price'}
											{...register('ItemPrice', { required: true })}
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Active</Form.Label>
										<Form.Select {...register('IsActive', { required: true })}>
											<option>Yes</option>
											<option>No</option>
										</Form.Select>
									</Form.Group>
								</Col>
							</Row>

							{Object.entries(errors).length === 0 ? null : (
								<Form.Text className="text-danger">
									All fields are required. Please ensure all fields are completed
								</Form.Text>
							)}
						</Container>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						{addIsLoading || editIsLoading === true ? (
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						) : (
							<Button variant="primary" type="submit">
								{edit ? 'UPDATE' : 'ADD'}
							</Button>
						)}
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default ModalForm;
