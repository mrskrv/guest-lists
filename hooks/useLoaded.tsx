import * as React from "react";

export default function useLoaded() {
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 200);
	}, []);

	return isLoaded;
}