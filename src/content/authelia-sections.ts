export const AUTHELIA_SECTIONS = [
  { id: 'protected-access-flow', label: 'Protected access flow' },
  { id: 'when', label: 'When to enable' },
  { id: 'prerequisite', label: 'Prerequisites' },
  { id: 'profile', label: 'Auth profile' },
  { id: 'middleware', label: 'Traefik middleware' },
  { id: 'incremental', label: 'One router at a time' },
  { id: 'users', label: 'Users and secrets' },
  { id: 'test', label: 'Test' },
] as const
