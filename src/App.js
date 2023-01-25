import NavbarComponent from './components/NavbarComponent';
import Router from './routes';
import { useState } from 'react';
import { BrandStateContext } from './context/BrandStateContext';

export default function App() {
	function GlobalStateProvider({ children }) {
		const [globalState, setGlobalState] = useState({});
		const [edit, setEdit] = useState(false);
		const [lastID, setLastID] = useState(0);

		return (
			<BrandStateContext.Provider
				value={{ globalState, setGlobalState, edit, setEdit, lastID, setLastID }}
			>
				{children}
			</BrandStateContext.Provider>
		);
	}
	return (
		<GlobalStateProvider>
			<NavbarComponent />

			<Router />
		</GlobalStateProvider>
	);
}
