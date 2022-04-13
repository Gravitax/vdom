const	PrintStr = (...data) => {
	return (
		<b className={data[0]?.className}>
			{data[0]?.str}
			{data[0]?.children}
		</b>
	);
};
