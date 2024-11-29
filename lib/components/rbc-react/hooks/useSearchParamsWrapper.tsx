// Type definitions
export interface SearchParamsObject {
  [key: string]: string;
}

export interface UrlChangeEvent extends CustomEvent {
  detail: {
    url: string;
  };
}

export interface SearchParamsHook {
  getAll: () => SearchParamsObject;
  getItem: (item: string) => string | null;
  setItem: (key: string, value: string) => void;
  setObject: (obj: SearchParamsObject, keepPrevParams?: boolean) => void;
  resetRoute: (obj: SearchParamsObject) => void;
}

/**
 * Custom hook for managing URL search parameters
 * @returns {SearchParamsHook} An object containing methods to interact with URL search parameters
 */
function useSearchParams(): SearchParamsHook {
  // Get current URL search params
  const getSearchParams = (): URLSearchParams => new URLSearchParams(window.location.search);
  
  // Get current pathname
  const getPathname = (): string => window.location.pathname;

  /**
   * Updates the URL with new search params without page reload
   * @param {string} newUrl - The new URL to push to history
   */
  const updateUrl = (newUrl: string): void => {
    window.history.pushState({}, '', newUrl);
    
    // Dispatch a custom event for URL changes
    const event: UrlChangeEvent = new CustomEvent('urlchange', {
      detail: { url: newUrl }
    }) as UrlChangeEvent;
    
    window.dispatchEvent(event);
  };

  /**
   * Gets all search parameters as an object
   * @returns {SearchParamsObject} Key-value pairs of all search parameters
   */
  const getAll = (): SearchParamsObject => {
    const params: SearchParamsObject = {};
    const searchParams = getSearchParams();
    
    searchParams.forEach((value: string, key: string) => {
      params[key] = value;
    });

    return params;
  };

  /**
   * Gets the value of a specific search parameter
   * @param {string} item - The key of the search parameter to get
   * @returns {string | null} The value of the search parameter or null if not found
   */
  const getItem = (item: string): string | null => {
    return getSearchParams().get(item);
  };

  /**
   * Sets a single search parameter
   * @param {string} key - The key of the parameter to set
   * @param {string} value - The value to set
   */
  const setItem = (key: string, value: string): void => {
    const params = getSearchParams();
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const newUrl = `${getPathname()}?${params.toString()}`;
    updateUrl(newUrl);
  };

  /**
   * Sets multiple search parameters from an object
   * @param {SearchParamsObject} obj - Object containing key-value pairs to set as search parameters
   * @param {boolean} keepPrevParams - Whether to keep existing parameters
   */
  const setObject = (obj: SearchParamsObject, keepPrevParams: boolean = false): void => {
    let params: URLSearchParams;
    
    if (keepPrevParams) {
      params = getSearchParams();
    } else {
      params = new URLSearchParams();
    }

    for (const [key, value] of Object.entries(obj)) {
      params.set(key, String(value));
    }

    const newUrl = `${getPathname()}?${params.toString()}`;
    updateUrl(newUrl);
  };

  /**
   * Removes specified parameters from the URL
   * @param {SearchParamsObject} obj - Object containing keys to remove from search parameters
   */
  const resetRoute = (obj: SearchParamsObject): void => {
    const params = getSearchParams();
    
    for (const key of Object.keys(obj)) {
      params.delete(key);
    }

    const newUrl = `${getPathname()}?${params.toString()}`;
    updateUrl(newUrl);
  };

  return { getAll, getItem, setItem, setObject, resetRoute };
}

export default useSearchParams;

// // Example usage with React and TypeScript
// import { useEffect } from 'react';

// interface Filters {
//   category?: string;
//   price?: string;
//   sort?: string;
// }

// function ExampleComponent() {
//   const { getAll, getItem, setItem, setObject, resetRoute } = useSearchParams();

//   useEffect(() => {
//     // Handle URL changes with typed event
//     const handleUrlChange = (event: UrlChangeEvent) => {
//       console.log('URL updated:', event.detail.url);
//     };
    
//     window.addEventListener('urlchange', handleUrlChange as EventListener);
//     return () => window.removeEventListener('urlchange', handleUrlChange as EventListener);
//   }, []);

//   // Get all params with type safety
//   const allParams: SearchParamsObject = getAll();
//   console.log('All params:', allParams);

//   // Get specific param
//   const page: string | null = getItem('page');
//   console.log('Current page:', page);

//   // Set single param with type checking
//   const handlePageChange = (newPage: string): void => {
//     setItem('page', newPage);
//   };

//   // Set multiple params with interface
//   const handleFiltersChange = (filters: Filters): void => {
//     const validFilters: SearchParamsObject = {};
    
//     if (filters.category) validFilters.category = filters.category;
//     if (filters.price) validFilters.price = filters.price;
//     if (filters.sort) validFilters.sort = filters.sort;
    
//     setObject(validFilters, true); // Keep existing params
//   };

//   // Reset specific params
//   const handleResetFilters = (): void => {
//     resetRoute({
//       category: '',
//       price: '',
//       sort: ''
//     });
//   };

//   return null; // Your component JSX here
// }

// // Example with custom types
// interface PaginationParams extends SearchParamsObject {
//   page: string;
//   limit: string;
//   sort?: string;
// }

// function usePagination() {
//   const { getAll, setObject } = useSearchParams();

//   const getPaginationParams = (): Partial<PaginationParams> => {
//     const params = getAll();
//     return {
//       page: params.page,
//       limit: params.limit,
//       sort: params.sort
//     };
//   };

//   const setPaginationParams = (params: Partial<PaginationParams>): void => {
//     setObject(params as SearchParamsObject, true);
//   };

//   return { getPaginationParams, setPaginationParams };
// }