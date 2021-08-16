import { signIn, signOut, useSession } from 'next-auth/client'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'



export default function Page() {
  const [login, setLogin] = useState(true)
  const [session, setSession] = useState(false)
  const router = useRouter()

  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"));
    setSession(!(user === undefined));
    if (user) router.push("/dashboard");
  }, [])

  return (<>
    {login
      ? <SignIn setLogin={setLogin}/> 
      : <SignUp setLogin={setLogin}/>
    }
    </>
  )
}