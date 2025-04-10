import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Fragment, createContext, useContext } from "react";
import { create } from "zustand";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

function MenuIcon(props) {
	return (
		<svg
			viewBox="0 0 10 9"
			fill="none"
			strokeLinecap="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M.5 1h9M.5 8h9M.5 4.5h9" />
		</svg>
	);
}

function XIcon(props) {
	return (
		<svg
			viewBox="0 0 10 9"
			fill="none"
			strokeLinecap="round"
			aria-hidden="true"
			{...props}
		>
			<path d="m1.5 1 7 7M8.5 1l-7 7" />
		</svg>
	);
}

const IsInsideMobileNavigationContext = createContext(false);

export function useIsInsideMobileNavigation() {
	return useContext(IsInsideMobileNavigationContext);
}

export const useMobileNavigationStore = create((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function MobileNavigation({ navigation }) {
	const isInsideMobileNavigation = useIsInsideMobileNavigation();
	const { isOpen, toggle, close } = useMobileNavigationStore();
	const ToggleIcon = isOpen ? XIcon : MenuIcon;

	return (
		<IsInsideMobileNavigationContext.Provider value={true}>
			<button
				type="button"
				className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-charcole-950/5 dark:hover:bg-white/5"
				aria-label="Toggle navigation"
				onClick={toggle}
			>
				<ToggleIcon className="w-2.5 stroke-charcole-900 dark:stroke-white" />
			</button>

			{!isInsideMobileNavigation && (
				<Transition.Root show={isOpen} as={Fragment}>
					<Dialog
						onClose={close}
						className="fixed inset-0 z-50 xl:hidden"
					>
						<Transition.Child
							as={Fragment}
							enter="duration-300 ease-out"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="duration-200 ease-in"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 top-14 bg-cream-400/20 backdrop-blur-sm dark:bg-black/40" />
						</Transition.Child>

						<Dialog.Panel>
							<Transition.Child
								as={Fragment}
								enter="duration-300 ease-out"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="duration-200 ease-in"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Header navigation={navigation} />
							</Transition.Child>

							<Transition.Child
								as={Fragment}
								enter="duration-500 ease-in-out"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="duration-500 ease-in-out"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<motion.div
									layoutScroll
									className={clsx(
										"fixed bottom-0 left-0 w-full overflow-y-auto bg-white px-4 pb-4 pt-6 shadow-lg shadow-charcole-900/10 ring-1 ring-charcole-900/7.5 dark:bg-charcole-950 dark:ring-charcole-800 min-[416px]:max-w-sm sm:px-6 sm:pb-10",
										navigation?.tabs
											? "top-navigation"
											: "top-14",
									)}
								>
									<Navigation navigation={navigation} />
								</motion.div>
							</Transition.Child>
						</Dialog.Panel>
					</Dialog>
				</Transition.Root>
			)}
		</IsInsideMobileNavigationContext.Provider>
	);
}
