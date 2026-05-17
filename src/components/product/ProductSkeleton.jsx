import Skeleton from '@/components/ui/Skeleton.jsx';

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-charcoal-100/70 bg-white shadow-soft">
      <Skeleton className="aspect-square w-full" rounded="rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
