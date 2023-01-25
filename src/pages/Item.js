import React, { useContext } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ItemTable from '../components/ItemTable';
import ModalForm from '../components/ModalForm';
import { BrandStateContext } from '../context/BrandStateContext';
import { useGetAllItem } from '../hooks/query/item';

export default function Item() {
	const { setLastID } = useContext(BrandStateContext);

	const { data, isLoading } = useGetAllItem({
		onSuccess: (data) => {
			setLastID(data[data?.length - 1]?.ItemID + 1 || 1);
		},
	});

	if (isLoading) {
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);
	}

	return (
		<Container style={{ marginTop: 20 }}>
			<Row>
				<Col>
					<h3>Items Inventory </h3>
					<br />

					<ModalForm />
				</Col>
			</Row>

			<br />
			<Row>
				<Col>
					<ItemTable data={data} />
				</Col>
			</Row>
		</Container>
	);
}
