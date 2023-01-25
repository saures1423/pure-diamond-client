import React from 'react';
import { Button, Card, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetAllBrands } from '../hooks/query/brand';
import { useGetAllItem } from '../hooks/query/item';

const Home = () => {
	const { data: brand, isLoading: isLoadingbrand } = useGetAllBrands();

	const { data: item, isLoading: isLoadingItem } = useGetAllItem();

	return (
		<Container style={{ marginTop: 30 }}>
			<Row className="justify-content-md-center">
				<Col xs lg="4">
					<Card style={{ width: '18rem', backgroundColor: '#82E0AA' }}>
						{/* <Card.Img variant="top" src="holder.js/100px180" /> */}
						<Card.Body>
							<Card.Title>Total Brand</Card.Title>
							{isLoadingbrand && (
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
							)}
							<Card.Text>{brand?.length}</Card.Text>
							<Button variant="primary" as={Link} to="/brand">
								ADD NEW
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col xs lg="4">
					<Card style={{ width: '18rem', backgroundColor: '#F7DC6F' }}>
						{/* <Card.Img variant="top" src="holder.js/100px180" /> */}
						<Card.Body>
							<Card.Title>Total Items</Card.Title>
							{isLoadingItem && (
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
							)}
							<Card.Text>{item?.length}</Card.Text>
							<Button variant="primary" as={Link} to="/item">
								ADD NEW
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="justify-content-md-center" style={{ marginTop: 30 }}>
				<Col xs lg="6">
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Brand ID</th>
								<th>Brand Name</th>
							</tr>
						</thead>
						<tbody>
							{isLoadingbrand && (
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
							)}

							{brand?.map((data, i) => (
								<tr key={i}>
									<td>{data?.BrandID}</td>
									<td>{data?.BrandName}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
				<Col xs lg="6">
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Item ID</th>
								<th>Item Name</th>
							</tr>
						</thead>
						<tbody>
							{isLoadingItem && (
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
							)}
							{item?.map((data, i) => (
								<tr key={i}>
									<td>{data?.ItemID}</td>
									<td>{data?.ItemName}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
