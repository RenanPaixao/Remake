import { supabase } from '../../initSupabase'


export class CommentsService {
  static queryBuilder = supabase.from('companies')

  static async getAllCommentsFromUser(userId) {
    const { data } = await CommentsService.queryBuilder.select('*, profile(*)').throwOnError()

    if(!data) return []
    return data
  }
}
