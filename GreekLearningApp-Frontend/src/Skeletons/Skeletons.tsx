import Skeleton from '@mui/material/Skeleton/Skeleton';

export function SettingsMenuTabSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" width={256} height={64} sx={{ m: 2, mb: 8 }} />
      <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
      <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
      <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
      <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
      <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
      <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
      <Skeleton variant="rounded" width={256} height={32} sx={{ m: 2, mb: 1 }} />
    </>
  );
}

export function TextRendererSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" width="90%" height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width="80%" height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width="95%" height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width="55%" height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width="90%" height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width="75%" height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width="45%" height={28} sx={{ m: 2, mb: 3 }} />
    </>
  );
}

export function DetailsSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" width={256} height={64} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width={256} height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width={256} height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width={256} height={28} sx={{ m: 2, mb: 3 }} />
      <Skeleton variant="rounded" width={256} height={28} sx={{ m: 2, mb: 3 }} />
    </>
  );
}
