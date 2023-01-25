import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

// Create a client
const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.warn(error.message);
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			toast.warn(error.message);
		},
		onSuccess: () => {},
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			// networkMode: 'offlineFirst',
		},
		mutations: {
			// networkMode: 'offlineFirst',
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter basename="/">
			<QueryClientProvider client={queryClient}>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable={false}
				/>
				<App />
				<ReactQueryDevtools initialIsOpen />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
