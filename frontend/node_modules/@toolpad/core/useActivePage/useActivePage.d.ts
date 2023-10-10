import type { BreadCrumb } from '../PageContainer';
export declare function useActivePage(): {
    title: string;
    path: string;
    breadCrumbs: BreadCrumb[];
} | null;
