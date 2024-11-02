import React from 'react';

const Subtitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
	return (
		<h1 className={`${className} -ml-4 mb-10 -mt-6 group-focus-visible:decoration-primary-500 group-focus-visible:decoration-2 border-l border-dashed border-primary p-1 pl-4 font-bold`}>
			{children}
		</h1>
	);
};

export default Subtitle;
