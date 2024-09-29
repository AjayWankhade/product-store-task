import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import CategorySelect from "./components/CategorySelector";
import LoadMoreButton from "./components/LoadMoreButton";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skipCount, setSkipCount] = useState(0);
  const limit = 10; // Limit for pagination

  const [searchParams, setSearchParams] = useSearchParams(); // Initialize search params

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Update state based on query parameters
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    setSelectedCategory(category);
    setSearchTerm(search);
    fetchProducts();
  }, [searchParams]);

  // Reset products and fetch new ones on category or search term change
  useEffect(() => {
    setProducts([]); // Reset products
    setSkipCount(0); // Reset skip count
    setSearchParams({ category: selectedCategory, search: searchTerm }); // Update query params
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  // Fetch products based on category and search term
  const fetchProducts = (loadMore = false) => {
    setLoading(true);
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skipCount}`;

    if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skipCount}`;
    }
    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${skipCount}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts((prevProducts) =>
          loadMore
            ? [...prevProducts, ...response.data.products]
            : response.data.products
        );
        setHasMore(response.data.products.length === limit);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  // Load more products when "Load More" is clicked
  const loadMoreProducts = () => {
    setSkipCount((prevSkip) => prevSkip + limit);
    fetchProducts(true); // Fetch more products instead of resetting the list
  };

  // Handle search input change with debounce
  const handleSearchChange = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  return (
    <div>
      <h1>Product Store</h1>

      {/* Category Dropdown */}
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Product List */}
      <ProductList products={products} />

      {/* Load More Button */}
      {hasMore && !loading && (
        <LoadMoreButton
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMoreProducts}
        />
      )}

      {loading && <p>Loading...</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}
    </div>
  );
};

export default App;
