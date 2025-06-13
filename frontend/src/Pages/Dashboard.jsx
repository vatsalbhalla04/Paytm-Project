import { AppBar } from "../Components/DashboardComponents/AppBar"
import { Balance } from "../Components/DashboardComponents/Balance"
import { UsersComponent } from "../Components/DashboardComponents/UsersComponent"

export const Dashboard = () => {
  return (
    <div>
      <AppBar/>
      <Balance/>
      <UsersComponent/>
    </div>
  )
}
