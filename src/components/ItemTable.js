import React, { useContext } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { BrandStateContext } from '../context/BrandStateContext';
import { useDeleteItem } from '../hooks/query/item';
import FilterComponent from './FilterComponent';

const ItemTable = ({ data }) => {
	const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const { setGlobalState, setEdit } = useContext(BrandStateContext);

	const { mutate, isLoading } = useDeleteItem({
		onSuccess: () => {
			toast.success('Item has been deleted.');
		},
	});

	const onDelete = (id) => {
		// eslint-disable-next-line no-restricted-globals
		const answer = confirm('Are you sure you want to delete this item?');

		if (answer) mutate({ ItemID: id });
	};

	const columns = [
		{
			name: 'Item ID',
			selector: (row) => row.ItemID,
			sortable: true,
		},
		{
			name: 'Item Name',
			selector: (row) => row.ItemName,

			minWidth: '300px',
			maxWidth: '500px',
		},
		{
			name: 'Item Price',
			selector: (row) => row.ItemPrice,
		},
		{
			name: 'Item UOM',
			selector: (row) => row.ItemUOM,
		},
		{
			name: 'Brand ID',
			selector: (row) => row.BrandID,
		},
		{
			name: 'Min Stock',
			selector: (row) => row.MinStock,
		},
		{
			name: 'Reorder Qty',
			selector: (row) => row.ReorderQty,
		},
		{
			name: 'Active',
			selector: (row) => row.IsActive,
		},
		{
			name: 'Actions',
			width: '200px',
			cell: (row) => (
				<>
					<Button
						variant="outline-success"
						size="sm"
						onClick={() => {
							setGlobalState({
								ItemID: row?.ItemID,
								ItemName: row?.ItemName,
								ItemPrice: row?.ItemPrice,
								ItemUOM: row?.ItemUOM,
								BrandID: row?.BrandID,
								MinStock: row?.MinStock,
								ReorderQty: row?.ReorderQty,
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
						onClick={() => onDelete(row?.ItemID)}
					>
						Delete
					</Button>
				</>
			),
		},
	];

	const filteredItems = data?.filter(
		(item) =>
			item.ItemName.toLowerCase().includes(filterText.toLowerCase()) ||
			item.ItemID.toString().includes(filterText.toLowerCase())
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
				title="Item List"
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

export default ItemTable;

// <Table striped bordered hover responsive>
// 			<thead>
// 				<tr>
// 					<th>Item ID</th>
// 					<th>Item Name</th>
// 					<th>Item Price</th>
// 					<th>Item UOM</th>
// 					<th>Brand ID</th>
// 					<th>Min Stock</th>
// 					<th>Reorder Qty</th>
// 					<th>Active</th>
// 					<th>Action</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{data?.map((item, i) => (
// 					<tr key={i}>
// 						<td>{item?.ItemID}</td>
// 						<td>{item?.ItemName}</td>
// 						<td>{item?.ItemPrice}</td>
// 						<td>{item?.ItemUOM}</td>
// 						<td>{item?.BrandID}</td>
// 						<td>{item?.MinStock}</td>
// 						<td>{item?.ReorderQty}</td>
// 						<td className={item?.IsActive === 'No' ? 'text-danger' : 'text-success'}>
// 							{item?.IsActive}
// 						</td>
// 						<td>
// 							<Button
// 								variant="outline-success"
// 								size="sm"
// 								onClick={() => {
// 									setGlobalState({
// 										ItemID: item?.ItemID,
// 										ItemName: item?.ItemName,
// 										ItemPrice: item?.ItemPrice,
// 										ItemUOM: item?.ItemUOM,
// 										BrandID: item?.BrandID,
// 										MinStock: item?.MinStock,
// 										ReorderQty: item?.ReorderQty,
// 										IsActive: item?.IsActive,
// 									});
// 									setEdit(true);
// 								}}
// 							>
// 								Edit
// 							</Button>

// 							<Button
// 								style={{ marginLeft: 10 }}
// 								variant="outline-danger"
// 								size="sm"
// 								// onClick={() => onDelete(brand?.BrandID)}
// 							>
// 								Delete
// 							</Button>
// 						</td>
// 					</tr>
// 				))}
// 			</tbody>
// 		</Table>
