import { Navigate } from "react-router-dom";
import { getToken } from "./utils/LocalStorage";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (token) {
    try {
      // فك تشفير الـ Payload
      const base64Url = token.split(".")[1]; // الجزء الثاني
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64)); // تحويل لـ JSON

      // التحقق من وقت الانتهاء
      const currentTime = Date.now() / 1000; // الوقت الحالي بالثواني
      if (payload.exp < currentTime) {
        return <Navigate to="/login" />;
      }
    } catch (error) {
      // لو حصل خطأ أثناء فك التشفير
      console.log(error);
      return <Navigate to="/login" />;
    }
  } else {
    // لو التوكن مش موجود
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
