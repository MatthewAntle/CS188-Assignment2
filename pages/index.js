import Link from 'next/link';

export default function Index() {
	return (
		<div>
			<p>Welcome to the Drake Apparel Store</p>
			<Link href="/items">
				<a title="Items Page">Start Shopping</a>
			</Link>
		</div>
		);
}
