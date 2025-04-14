import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import AddItem from "./pages/AddItem";
import ItemsList from "./pages/ItemList";
import MainLayout from "./components/MainLayout";
import Welcome from "./components/Welcome";
import AddPurchse from "./pages/AddPurchse";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Welcome />} />
          <Route path="add" element={<AddItem />} />
          <Route path="add-purchase" element={<AddPurchse />} />
          <Route path="items-list" element={<ItemsList />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}
export default App;

// <Router>
// <div className="flex h-screen">
//   {/* sidebar */}

//   {/* main containt........... */}
//   <main className="flex-1 md:ml-48 overflow-y-auto p-6 bg-pink-200">
//     <Routes>
//       <Route path="/" element={<AddItem />} />
//       <Route path="/items-list" element={<ItemsList />} />
//     </Routes>
//   </main>
// </div>
// </Router>
