import React from 'react';

const ToolTip = ({ tip }: { tip: String }) => {
	return (
		<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block border-none bg-gray-800 text-white text-sm px-2 py-1 rounded'>
			{tip}
		</div>
	);
};

export default ToolTip;
