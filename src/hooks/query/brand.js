import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBrand, deleteBrand, editBrand, getAllBrands } from '../../api/brandApi';

export const useGetAllBrands = (options) => {
	return useQuery(['brands'], getAllBrands, {
		...options,
		select: ({ rows }) => {
			return rows;
		},
	});
};

export const useCreateBrand = (options) => {
	const queryClient = useQueryClient();

	return useMutation(createBrand, {
		...options,
		onSettled: () => {
			queryClient.invalidateQueries(['brands']);
		},
	});
};

export const useEditBrand = (options) => {
	const queryClient = useQueryClient();

	return useMutation(editBrand, {
		...options,
		onSettled: () => {
			queryClient.invalidateQueries(['brands']);
		},
	});
};

export const useDeleteBrand = (options) => {
	const queryClient = useQueryClient();

	return useMutation(deleteBrand, {
		...options,
		onSettled: () => {
			queryClient.invalidateQueries(['brands']);
		},
	});
};
