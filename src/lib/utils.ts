import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateURLParams(currentParams: URLSearchParams, newParams: Record<string, string>): string {
  const updatedParams = new URLSearchParams(currentParams.toString());
  Object.entries(newParams).forEach(([key, value]) => {
    updatedParams.set(key, value);
  });
  return `?${updatedParams.toString()}`;
}



/**
 * Parses raw search parameters into strongly typed fetch options.
 *
 * @param searchParams - Object containing query parameters, usually from URLSearchParams.
 * @returns A normalized fetch options object that can be passed to APIs.
 *
 * Supported params:
 * - search: string
 * - searchBy: string | string[]
 * - page: string
 * - limit: string
 * - sort: string (format: "column.asc" or "column.desc")
 * - sortBy: string (e.g. "id", "createdAt")
 * - sortOrder: "ASC" | "DESC"
 * - categoryId: number
 * - minPrice: number
 * - maxPrice: number
 * - color: string
 */
export function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }) {
  const { search, sort, page } = searchParams;

  const fetchOptions: {
    search?: string;
    page?: string;
    sort?: { [key: string]: 1 | -1 };
    limit?: string;
    categoryId?: number;
    searchBy?: string | string[];
    sortOrder?: 'ASC' | 'DESC';
    sortBy?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    [key: string]: any;
  } = {};

  // search
  if (search) {
    // fetchOptions.searchBy = searchBy as string;
    fetchOptions.search = search as string;
  }

  // page
  if (page) {
    fetchOptions.page = page as string;
  }

  // sort in format: column.asc / column.desc
  if (sort) {
    const [column, direction] = (sort as string).split('.');
    fetchOptions.sort = { [column]: direction === 'asc' ? 1 : -1 };
  }
  // pagination
  if (searchParams.limit) {
    fetchOptions.limit = searchParams.limit as string;
  }

  return fetchOptions;
}


export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? (accurateSizes[i] ?? 'Bytest') : (sizes[i] ?? 'Bytes')
  }`;
}


export function generateSlug(title: string): string {
  const timestamp = Date.now(); 
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")  
      .replace(/\s+/g, "-")  
      .replace(/--+/g, "-") +  
    `-${timestamp}`             
  );
}