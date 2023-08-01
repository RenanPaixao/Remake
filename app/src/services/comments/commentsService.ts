import { supabase } from '../../initSupabase'

export interface IProfile {
    name: string
    img_url?: string
  }
export interface IComment {
    profile: IProfile;
    comment?: string;
    avaliation?: number;
    id?: string;
    created_at?: string;
}

export class CommentsService {
  static async getAllCommentsFromLocation(locationId: string) {
    const { data } = await supabase.from('comments')
      .select('*, profiles(*)')
      .eq('location_id', locationId)
      .order('created_at', { ascending: false })
      .throwOnError()

    if (!data) return []

    return data
  }
}
