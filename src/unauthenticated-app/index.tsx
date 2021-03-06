/**
 * 未登录
 */

import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [ isRegister, setIsRegister ] = useState(false);
  
  return <div>
    {
      isRegister ? <RegisterScreen /> : <LoginScreen />
    }

    <button onClick={() => setIsRegister(!isRegister)}>切换状态</button>
  </div>
}