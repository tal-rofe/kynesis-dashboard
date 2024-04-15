import React from 'react';
import Image from 'next/image';

import authBackground from '@/public/images/auth-background.png';

type PageProps = {
	readonly children: React.ReactNode;
};

const AuthLayout = (props: PageProps) => {
	return (
		<div className="relative w-full h-full overflow-hidden">
			<div className="absolute top-0 left-0 w-full h-full">
				<Image className="object-cover" alt="Auth background" src={authBackground} fill quality={100} />
			</div>
			<div className="relative z-10">{props.children}</div>
		</div>
	);
};

export default AuthLayout;
