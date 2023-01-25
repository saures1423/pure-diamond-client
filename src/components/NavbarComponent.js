/* eslint-disable jsx-a11y/anchor-is-valid */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

const NavbarComponent = () => {
	const { pathname } = useLocation();
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand as={Link} to="/">
					Pure Diamond Enterprise
				</Navbar.Brand>

				<Nav className="justify-content-center" activeKey={pathname}>
					<Nav.Link as={Link} to="/">
						Home
					</Nav.Link>
					<Nav.Link as={Link} to="/brand">
						Brand
					</Nav.Link>
					<Nav.Link as={Link} to="/item">
						Inventory Items
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
