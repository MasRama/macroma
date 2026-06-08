/**
 * Shared Team Types
 */

export interface TeamMember {
  id: string;
  photo_url: string | null;
  name: string;
  position: string;
  jobdesk: string;
  order: number;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamForm {
  id: string | null;
  photo_url: string;
  name: string;
  position: string;
  jobdesk: string;
  order: number;
}

export function createEmptyTeamForm(): TeamForm {
  return {
    id: null,
    photo_url: '',
    name: '',
    position: '',
    jobdesk: '',
    order: 0
  };
}

export function teamToForm(team: TeamMember): TeamForm {
  return {
    id: team.id,
    photo_url: team.photo_url || '',
    name: team.name || '',
    position: team.position || '',
    jobdesk: team.jobdesk || '',
    order: team.order || 0
  };
}
