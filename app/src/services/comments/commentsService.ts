import { supabase } from '../../initSupabase'

interface IMetaData {
  name: string
  img_url?: string
}
export interface IUser {
  id: string
  email: string
  meta_data?: IMetaData
}
export interface IComment {
  users: IUser;
  comment?: string;
  avaliation?: number;
  id?: string;
  created_at?: string;
}

interface InputCreateComment {
  userId: string
  comment: string
  avaliation: number
  locationId: string
}

export class CommentsService {
  static async getAllCommentsFromLocation(locationId: string) {
    const { data } = await supabase.from('comments')
      .select('*, users(*)')
      .eq('location_id', locationId)
      .order('created_at', { ascending: false })
      .throwOnError()
    if (!data) return []

    return data
  }

  static async createComment(props: InputCreateComment) {
    const { data } = await supabase
      .from('comments')
      .insert({
        ...props,
        location_id: props.locationId,
        user_id: props.userId
      })
      .select('*')
      .throwOnError()

    return data
  }
}
