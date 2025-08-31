import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
	return (
		<Navbar variant='dark' expand='lg' className='custom-navbar'>
			<Container>
				<Navbar.Brand href='/' className='d-flex align-items-center'>
					<div className='d-flex align-items-center'>
						<img src='./common/logo.png' alt='logo' style={{ width: "50px" }} />
						<p>Quantis</p>
					</div>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						<NavDropdown title='財務機能' id='finance-dropdown'>
							<NavDropdown.Item href='/'>專案管理</NavDropdown.Item>
							<NavDropdown.Item href='/'>報表整合工具</NavDropdown.Item>
							<NavDropdown.Item href='#account-group-2'>
								傳票批次檢核
							</NavDropdown.Item>
							<NavDropdown.Item href='/'>商業智慧(BI)</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
