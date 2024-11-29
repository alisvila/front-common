export type ColumnsType = {
    label: string;
    accessor: string;
    renderType?: ColumnsRenderTypes;
    trueLabel?: string;
    falseLabel?: string
};

export type DataTableType = {
    id: string | number;
} & any;

export type ColumnsRenderTypes = 'tag' | 'status' | 'link';