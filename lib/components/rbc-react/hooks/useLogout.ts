// import removeToken from "@/utils/auth/removeToken";
// import {routerLinks} from "@/constance/routerLinks";
// import {useRouter} from "next/navigation";

function useLogout() {

  // const router = useRouter()

  function logoutHandler() {
    // removeToken()
    // router.push(routerLinks.Login)
  }

  return logoutHandler
}

export default useLogout