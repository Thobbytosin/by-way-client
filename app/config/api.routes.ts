export const API_AUTH_PATHS = {
  SIGNUP: "/registration",
  LOGIN: "/login",
  LOGOUT: "/logout",
  SOCIALLOGIN: "/social-auth",
  REFRESHTOKEN: "/refresh-tokens",
  VERIFICATION: "/account-verification",
  RESENDVERIFICATIONCODE: "/resend-verification-code",
  CLEARACCESSTOKEN: "/clear-access-token",
};

export const API_USER_PATHS = {
  FETCHUSER: "/me",
  GETUSERSLIST: "/get-users-list",
  UPDATEAVATAR: "/update-profile-picture",
  UPDATEUSERINFO: "/update-user-info",
  UPDATEUSERPASSWORD: "/update-user-password",
  GETADMINLIST: "/get-admin-list",
  GETADMIN: "/get-admin",
};

export const API_COURSES_PATHS = {
  ALLCOURSESFREE: "/get-courses",
  GETCOURSEBYID: "/get-course",
  GETCOURSEBYIDFREE: "/get-course-free",
};

export const API_LAYOUT_PATHS = {
  GETLAYOUTTYPE: "/get-layout",
};

export const API_ORDER_PATHS = {
  PAYMENTINTENT: "/payment",
  STRIPEPUBLISHABLEKEY: "/payment/stripe-publishable-key",
};
