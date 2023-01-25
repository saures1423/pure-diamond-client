import React, { useContext } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { BrandStateContext } from '../context/BrandStateContext';
import { useDeleteBrand } from '../hooks/query/brand';
import FilterComponent from '../components/FilterComponent';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const BrandTable = ({ data }) => {
	const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const { setGlobalState, setEdit } = useContext(BrandStateContext);

	const { mutate, isLoading } = useDeleteBrand({
		onSuccess: () => {
			toast.success('Brand has been deleted.');
		},
	});

	const onDelete = (id) => {
		// eslint-disable-next-line no-restricted-globals
		const answer = confirm('Are you sure you want to delete this brand?');

		if (answer) mutate({ BrandID: id });
	};

	const columns = [
		{
			name: 'Brand ID',
			selector: (row) => row.BrandID,
		},
		{
			name: 'Brand Name',
			selector: (row) => row.BrandName,
		},
		{
			name: 'Active',
			selector: (row) => row.IsActive,
		},
		{
			name: 'Actions',
			cell: (row) => (
				<>
					<Button
						variant="outline-success"
						size="sm"
						onClick={() => {
							setGlobalState({
								BrandID: row?.BrandID,
								BrandName: row?.BrandName,
								IsActive: row?.IsActive,
							});

							setEdit(true);
						}}
					>
						Edit
					</Button>
					<Button
						style={{ marginLeft: 10 }}
						variant="outline-danger"
						size="sm"
						onClick={() => onDelete(row?.BrandID)}
					>
						Delete
					</Button>
				</>
			),
		},
	];

	const filteredItems = data?.filter(
		(item) =>
			item.BrandName.toLowerCase().includes(filterText.toLowerCase()) || item.BrandID === filterText
	);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent
				onFilter={(e) => setFilterText(e.target.value)}
				onClear={handleClear}
				filterText={filterText}
			/>
		);
	}, [filterText, resetPaginationToggle]);

	return (
		<>
			{isLoading && (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}

			<DataTable
				title="Brand List"
				columns={columns}
				data={filteredItems}
				pagination
				subHeader
				subHeaderComponent={subHeaderComponentMemo}
				responsive
				striped
				highlightOnHover
			/>
		</>
	);
};

export default BrandTable;
