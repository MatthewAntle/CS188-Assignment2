import Link from 'next/link';

export default function Index() {
	return (
		<div>
			<p>Welcome to the Drake Apparel Store</p>
			<ul>
				<li>
					<Link href="/items">
						<a title="Items Page">Start Shopping</a>
					</Link>
				</li>
				<li>
					<Link href="/cart">
						<a title="Cart Page">View Cart</a>
					</Link>
				</li>
			</ul>
			
		</div>
		);
}
