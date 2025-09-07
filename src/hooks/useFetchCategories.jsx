import { useState, useEffect } from "react";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        setError(error);
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return { categories, error };
};

export default useFetchCategories;
