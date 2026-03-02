import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import SigOutButton from "./_components/sign-out-button"
import { redirect } from "next/navigation"

const DashBoardPage = async () =>{
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if(!session){
      redirect("/authentication")
    }
    return (
      <div>
        <h1>DashBoard</h1>
        <h1>{session?.user.name}</h1>
        <h1>{session?.user.email}</h1>
        <SigOutButton/>
      </div>
    );
}

export default DashBoardPage

// Renderiza a saida com useClient