import { AppBar } from "../Components/DashboardComponents/AppBar"
import { Balance } from "../Components/DashboardComponents/Balance"
import { UsersComponent } from "../Components/DashboardComponents/UsersComponent"

export const Dashboard = () => {
  return (
    <div>
      <AppBar/>
      <hr className="border-t border-gray-200"></hr>
      <Balance/>
      <UsersComponent/>
    </div>
  )
}
