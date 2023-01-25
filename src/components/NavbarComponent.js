/* eslint-disable jsx-a11y/anchor-is-valid */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';

const NavbarComponent = () => {
	const { pathname } = useLocation();
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">Pure Diamond Enterprise</Navbar.Brand>

				<Nav className="justify-content-center" activeKey={pathname}>
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/brand">Brand</Nav.Link>
					<Nav.Link href="/item">Inventory Items</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
