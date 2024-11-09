import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/nav.css";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
	{ label: "All", path: "/" },
	{ label: "Design", path: "/design" },
	{ label: "Development", path: "/dev" },
	{ label: "Projects", path: "/projects" },
	{ label: "Articles", path: "/articles" },
	{ label: "About", path: "/about" },
];

export default function Nav() {
	const [activeTab, setActiveTab] = useState(navItems[0].label);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const containerRef = useRef(null);
	const activeTabElementRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const visibleNavItems = windowWidth < 680
		? navItems.filter(item => !['Projects', 'Articles', 'About'].includes(item.label))
		: navItems;

	useEffect(() => {
		const currentPath = location.pathname;
		const currentTab = navItems.find((item) => item.path === currentPath);
		if (currentTab) {
			setActiveTab(currentTab.label);
		}
	}, [location]);

	useEffect(() => {
		const container = containerRef.current;

		if (activeTab && container) {
			const activeTabElement = activeTabElementRef.current;

			if (activeTabElement) {
				const { offsetLeft, offsetWidth } = activeTabElement;

				const clipLeft = offsetLeft;
				const clipRight = offsetLeft + offsetWidth;
				container.style.clipPath = `inset(0 ${Number(
					100 - (clipRight / container.offsetWidth) * 100
				).toFixed()}% 0 ${Number(
					(clipLeft / container.offsetWidth) * 100
				).toFixed()}% round 100px)`;
			}
		}
	}, [activeTab, activeTabElementRef, containerRef]);

	return (
		<nav>
			<div className="nav-wrapper">
				<div className="nav-link-wrapper">
					<ul className="list">
						{visibleNavItems.map((item, index) => (
							<React.Fragment key={item.path}>
								<li>
									<Link
										ref={activeTab === item.label ? activeTabElementRef : null}
										to={item.path}
										onClick={() => setActiveTab(item.label)}
										className="nav-button"
									>
										{item.label}
									</Link>
								</li>
								{item.label === "Articles" && windowWidth >= 680 && (
									<div className="separatorY navSeparator"></div>
								)}
							</React.Fragment>
						))}
					</ul>

					<div aria-hidden className="clip-path-container" ref={containerRef}>
						<ul className="list list-overlay">
							{visibleNavItems.map((item, index) => (
								<React.Fragment key={item.path}>
									<li>
										<Link
											to={item.path}
											onClick={() => setActiveTab(item.label)}
											className="nav-button-overlay nav-button"
											tabIndex={-1}
										>
											{item.label}
										</Link>
									</li>
									{item.label === "Articles" && windowWidth >= 680 && (
										<div className="separatorY navSeparator"></div>
									)}
								</React.Fragment>
							))}
						</ul>
					</div>
				</div>
			</div>
			<ThemeToggle />
		</nav>
	);
}