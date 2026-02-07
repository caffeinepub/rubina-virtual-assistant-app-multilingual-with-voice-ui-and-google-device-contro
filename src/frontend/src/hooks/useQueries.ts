import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { runRuntimePreflight } from '../deploy/runRuntimePreflight';

/**
 * Hook to run runtime preflight checks on the backend actor.
 * Used for deployment diagnostics and validation.
 */
export function useRuntimePreflight() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['runtime-preflight'],
    queryFn: async () => {
      console.log('[useRuntimePreflight] Running preflight checks...');
      const result = await runRuntimePreflight(actor);
      console.log('[useRuntimePreflight] Preflight result:', result);
      return result;
    },
    enabled: !!actor && !isFetching,
    staleTime: Infinity, // Only run once per session
    retry: false, // Don't retry preflight checks
  });
}
