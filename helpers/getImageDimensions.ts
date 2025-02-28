export const getImageDimensions = (index: number) => {
	const patterns = [
		// Standard sizes
		{ height: "h-40 sm:h-48", span: "", className: "rounded-lg" },                     // Small square
		{ height: "h-64 sm:h-72", span: "row-span-2", className: "rounded-xl" },           // Tall rectangle
		{ height: "h-40 sm:h-48", span: "col-span-2", className: "rounded-lg" },           // Wide rectangle

		// Feature sizes
		{ height: "h-64 sm:h-72", span: "col-span-2 row-span-2", className: "rounded-2xl" }, // Large featured square
		{ height: "h-40 sm:h-48", span: "", className: "rounded-full overflow-hidden" },   // Circle frame

		// Accent sizes
		{ height: "h-40 sm:h-56", span: "", className: "rounded-lg" },                     // Standard
		{ height: "h-52 sm:h-64", span: "col-span-2", className: "rounded-xl" },           // Wide feature
		{ height: "h-32 sm:h-40", span: "", className: "rounded-lg" },                     // Small accent
	];

	return patterns[index % patterns.length];
};
