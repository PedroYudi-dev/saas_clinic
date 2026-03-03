import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import SigOutButton from "./_components/sign-out-button"
import { redirect } from "next/navigation"
import { db } from "@/src/db"
import { usersToClinicsTable } from "@/src/db/schema"
import { eq } from "drizzle-orm"

const DashBoardPage = async () =>{
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if(!session){
      redirect("/authentication")
    }
    const clinics = await db.query.usersToClinicsTable.findMany({
      where: eq(usersToClinicsTable.userId, session.user.id)
    })
    if (clinics.length === 0) {
      redirect("/clinic-form")
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
