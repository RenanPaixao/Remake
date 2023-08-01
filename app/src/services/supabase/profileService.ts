import { supabase } from '../../initSupabase'

interface Profile {
  id: string
  first_name: string
  last_name: string
  is_recycler: boolean
  company_id: string
}

export class ProfilesService {
  static queryBuilder = supabase.from('profiles')

  static async updateProfile(id: string, profile: Partial<Profile>) {
    console.log(profile)
    const { data } = await ProfilesService.queryBuilder
      .update(profile).eq('id', id).throwOnError()

    return data
  }
}
