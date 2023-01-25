import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteItem, editItem, getAllItems, postItem } from '../../api/itemApi';

export const useGetAllItem = (options) => {
	return useQuery(['items'], getAllItems, {
		...options,
		select: ({ rows }) => {
			return rows;
		},
	});
};

export const usePostItem = (options) => {
	const queryClient = useQueryClient();
	return useMutation(postItem, {
		...options,
		onSettled: () => {
			queryClient.invalidateQueries(['items']);
		},
	});
};

export const useEditItem = (options) => {
	const queryClient = useQueryClient();
	return useMutation(editItem, {
		...options,
		onSettled: () => {
			queryClient.invalidateQueries(['items']);
		},
	});
};

export const useDeleteItem = (options) => {
	const queryClient = useQueryClient();

	return useMutation(deleteItem, {
		...options,
		onSettled: () => {
			queryClient.invalidateQueries(['items']);
		},
	});
};
