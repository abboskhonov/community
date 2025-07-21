import { logout } from "../utils/authHelpers"


const HomePage = () => {

  return (
    <div>
      hello this is home
      <button onclick={() => logout()}>Logout</button>
    </div>
  )
}

export default HomePage
