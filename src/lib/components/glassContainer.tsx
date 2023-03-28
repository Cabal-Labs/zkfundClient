export default function Container({ children, ...props }) {
	return (
		<main>
			<div className="container">{children}</div>
			<div className="shapes">
				<div className="shape-0"></div>
				<div className="shape-1"></div>
				<div className="shape-2"></div>
				<div className="shape-3"></div>
				<div className="shape-4"></div>
				<div className="shape-5"></div>
				<div className="shape-6"></div>
				<div className="shape-7"></div>
			</div>
		</main>
	);
}
