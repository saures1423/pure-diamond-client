import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BrandForm from '../components/BrandForm';
import BrandTable from '../components/BrandTable';
import { useGetAllBrands } from '../hooks/query/brand';
import { BrandStateContext } from '../context/BrandStateContext';
import { Spinner } from 'react-bootstrap';

export default function Brand() {
	const { setLastID } = useContext(BrandStateContext);

	const { data, isLoading } = useGetAllBrands({
		onSuccess: (data) => {
			setLastID(data[data?.length - 1]?.BrandID + 1 || 1);
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
			<h3>Add New Brand</h3>
			<br />
			<Row>
				<Col xs lg="4">
					<BrandForm />
				</Col>
				<Col>
					<BrandTable data={data} />
				</Col>
			</Row>
		</Container>
	);
}
