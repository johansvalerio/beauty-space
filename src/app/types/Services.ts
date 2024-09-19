export interface ServiceProps {
    id: number;
    title: string;
    description: string;
    img: string;
    price?: string;
    info?: Info[];
}

export interface Info {
    title?: string;
    description?: string;
}

