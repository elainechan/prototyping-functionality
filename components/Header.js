import React from 'react';
import Link from 'next/link';

const linkStyle = {
	marginRight: 15
}

const Header = () => (
	<div>
		<Link href="/">
		<a style={linkStyle}>Home</a>
		</Link>
		<Link href="/table/Table">
		<a style={linkStyle}>Table</a>
		</Link>
	</div>
)

export default Header;