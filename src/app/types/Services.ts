export interface ServiceProps {
    id: number;
    title: string;
    description: string;
    img: string;
    price?: string;
    info?: Info[];
}

export interface Info {
    id?: number;
    extra?: string;
    title?: string;
    description?: string;
    img?: string;
    price?: string;
    subinfo?: SubInfo[];
}

export interface SubInfo {
    id?: number;
    title?: string;
    description?: string;
    price?: string;
    img?: string;

}

