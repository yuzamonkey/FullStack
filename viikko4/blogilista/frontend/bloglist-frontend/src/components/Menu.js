import React from 'react'
import LoggedInInfo from './LoggedInInfo'

import { Nav, Navbar, FormControl, Form, Button } from 'react-bootstrap'

const Menu = () => {

  return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/">FullStackBlogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link>
              <LoggedInInfo />
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Navbar>
  )
}
export default Menu