import { supabase } from '../../initSupabase'

interface Metadata {
  first_name: string
  last_name: string
  is_recycler: boolean
  company_id?: null | string
}
interface User {
  id: string
  email: string
  password: string
}

class UsersServiceCreator {
  async signUp(email: string, password: string, metadata: Metadata) {
    const { user, error } = await supabase.auth.signUp({ email, password }, { data: metadata })

    if (error) {
      alert(error.message)
      throw error
    }

    return user
  }
}

export const UsersService = new UsersServiceCreator()
