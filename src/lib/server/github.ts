import { site } from '#lib/site.ts';
import type { Stats } from '#lib/types.ts';

type Repo = {
  stargazers_count: number;
  language: string | null;
  license: { spdx_id: string } | null;
  topics: string[];
  created_at: string;
  pushed_at: string;
};

const cache = new Map<string, Promise<Stats>>();
const headers: HeadersInit = {
  accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN && { authorization: `Bearer ${process.env.GITHUB_TOKEN}` })
};

// a failed fetch fails the build, so the live site keeps yesterday's numbers rather than none
async function fetchStats(name: string): Promise<Stats> {
  const response = await fetch(`https://api.github.com/repos/${site.owner}/${name}`, {
    headers,
    signal: AbortSignal.timeout(15_000)
  });
  if (!response.ok) throw new Error(`GitHub said ${response.status} for ${name}`);
  const repo: Repo = await response.json();
  return {
    stars: repo.stargazers_count,
    language: repo.language ?? undefined,
    licence: repo.license?.spdx_id === 'NOASSERTION' ? undefined : repo.license?.spdx_id,
    topics: repo.topics,
    created: repo.created_at,
    updated: repo.pushed_at
  };
}

export function stats(name: string) {
  if (!cache.has(name)) cache.set(name, fetchStats(name));
  return cache.get(name)!;
}
