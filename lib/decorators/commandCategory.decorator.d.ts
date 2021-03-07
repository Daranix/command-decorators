import "reflect-metadata";
export declare function CommandCategory(categoryInfo: {
    name: string;
    description: string;
    iocIdentifier?: unknown;
}): (target: any) => void;
