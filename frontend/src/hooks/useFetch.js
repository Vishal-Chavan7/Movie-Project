import { useState, useEffect } from "react";
import axios from "axios";



const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/${endpoint}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
                );
                console.log("API data:", response.data.results);
                if (!response.data.results) {
                    throw new Error("No data found");
                }
                setData(response.data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // <-- Call the async function
    }, [endpoint]);

    return { data, loading, error }; // <-- Return the state
};

export default useFetch;