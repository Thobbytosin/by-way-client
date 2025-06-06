export const API_AUTH_PATHS = {
  SIGNUP: "/registration",
  LOGIN: "/login",
  LOGOUT: "/logout",
  SOCIALLOGIN: "/social-auth",
  ACTIVATEUSER: "/activate-user",
};

export const API_USER_PATHS = {
  FETCHUSER: "/me",
  GETUSERSLIST: "/get-users-list",
  UPDATEAVATAR: "/update-profile-picture",
  UPDATEUSERINFO: "/update-user-info",
  UPDATEUSERPASSWORD: "/update-user-password",
  GETADMINLIST: "/get-admin-list",
  GETADMIN: "/get-admin",
  UPDATEVIEWEDLESSON: "/update-user-videos-viewed",
};

export const API_COURSES_PATHS = {
  ALLCOURSESFREE: "/get-courses",
  GETCOURSEBYID: "/get-course",
  GETCOURSEBYIDFREE: "/get-course-free",
  GETCOURSECONTENTBYID: "/get-course-content",
  ADDQUESTION: "/add-question",
  ADDREPLYTOQUESTION: "/add-answer",
  ADDCOURSEREVIEWBYID: "/add-review",
  ADDREPLTYTOCOURSEREVIEWBYID: "/add-reply-review",
};

export const API_LAYOUT_PATHS = {
  GETLAYOUTTYPE: "/get-layout",
};

export const API_ORDER_PATHS = {
  PAYMENTINTENT: "/payment",
  STRIPEPUBLISHABLEKEY: "/payment/stripe-publishable-key",
  CREATEORDER: "/create-order",
};
