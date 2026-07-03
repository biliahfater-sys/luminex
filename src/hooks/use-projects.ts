import { PROJECTS, type Project } from '../data/projects'

/**
 * Static portfolio demo — projects come straight from the bundled data file.
 * No backend, no fetching: the whole site ships as static files.
 */
export function useProjects(): Project[] {
  return PROJECTS
}
