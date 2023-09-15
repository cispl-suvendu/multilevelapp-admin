import { Skeleton } from 'primereact/skeleton';

export default function Rectangle() {
    return (
        <>
            <Skeleton className="mb-2 " height="2rem"></Skeleton>
            <Skeleton width="10rem" height="2rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" height="2rem" className="mb-2"></Skeleton>
            <Skeleton height="2rem" className="mb-2"></Skeleton>
            <Skeleton width="10rem" height="2rem" className="mb-2"></Skeleton>
            <Skeleton className="mb-2" height="2rem"></Skeleton>
        </>
    )
}
