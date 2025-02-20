'use client';
import Link from 'next/link';
import { HandHeart, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { appBarItems } from '@/constants';
import Image from 'next/image';

export default function AppBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/90">
			<div className="relative flex items-center h-16 px-4">
				<div className="hidden md:block">
					<Link href="/" className="flex items-center space-x-2">
						<motion.div
							whileHover={{ rotate: 10 }}
							transition={{ type: 'spring', stiffness: 400 }}
						>
							<Image src="/logo-icon.png" alt='logo' width={45} height={45} />
						</motion.div>
						<Image src="/logo.png" alt='logo' width={120} height={45} />
					</Link>
				</div>

				<div className="md:hidden flex-1 flex justify-center">
					<Image src="/logo-icon.png" alt='logo' width={25} height={25} />
					<Link href="/" className="flex items-center space-x-2">
						<Image src="/logo.png" alt='logo' width={120} height={45} />
					</Link>
				</div>

				<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
					<nav className="flex items-center space-x-6">
						{appBarItems.map((item, index) => (
							<motion.div
								key={index}
								whileHover={{
									scale: 1.1,
								}}
								transition={{ type: 'keyframes' }}
							>
								<Link
									href={item.link}
									className="text-gray-700 hover:text-black transition-colors"
								>
									{item.title}
								</Link>
							</motion.div>
						))}
					</nav>
				</div>

				<div className="ml-auto flex items-center space-x-4">
					<Button
						variant="outline"
						className="hidden md:inline-flex">Sponsor a Snoot
						<HandHeart />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						{isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-12 w-12" />}
					</Button>
				</div>
			</div>

			{isMenuOpen && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					className="border-t bg-white md:hidden"
				>
					<nav className="flex flex-col space-y-4 p-4">
						{appBarItems.map((item, index) => (
							<Link
								href={item.link}
								key={index}
								className="text-primary hover:text-black transition-colors"
							>
								{item.title}
							</Link>
						))}
						<Button variant="outline" className="w-full justify-center">Book an Appointment
							<HandHeart />
						</Button>
					</nav>
				</motion.div>
			)}
		</header>
	);
}
