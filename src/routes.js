import { Route, Routes } from 'react-router-dom';
import Brand from './pages/Brand';
import Home from './pages/Home';
import Item from './pages/Item';

export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/brand" element={<Brand />} />
			<Route path="/item" element={<Item />} />
		</Routes>
	);
}
