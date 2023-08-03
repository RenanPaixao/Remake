import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../initSupabase'
import { Session } from '@supabase/supabase-js'
import { Metadata } from '../services/supabase/usersService'
type ContextProps = {
	user: null | boolean;
	session: Session | null;
  userMetadata: Metadata | null;
};

const AuthContext = createContext<Partial<ContextProps>>({})

interface Props {
	children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  // user null = loading
  const [user, setUser] = useState<null | boolean>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userMetadata, setUserMetadata] = useState<Metadata | null>(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(!!session)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Supabase auth event: ${event}`)
        setUserMetadata(session?.user?.user_metadata as Metadata)
        setSession(session)
        setUser(!!session)
      }
    )
    return () => {
			authListener!.unsubscribe()
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userMetadata
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
