import Image from 'next/image';
import * as React from 'react';
import Header from './header';
import RunPanel from './run-panel';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex flex-col max-w-full h-screen relative overflow-hidden'>
			<Header />
			<div className='flex flex-row' style={{ height: 'calc(100vh - 80px)' }}>
				<div className='flex lg:hidden justify-center items-center w-full font-semibold text-md'>{`Sorry, mobile currently not support yet :(`}</div>
				<div className='hidden lg:flex flex-1'>{children}</div>
				<div className='hidden lg:flex w-80'>
					<RunPanel />
				</div>
			</div>
		</div>
	);
};

export default React.memo(Layout);
