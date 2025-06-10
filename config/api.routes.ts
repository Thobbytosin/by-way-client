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
  GETALLUSERSADMIN: "/get-all-users",
  UPDATEUSERROLE: "/update-user-role",
  DELETEUSERBYID: "/delete-user",
  GETUSERCOURSESSUMMARY: "/get-user-courses-summary",
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
  GETALLCOURSESADMIN: "/get-all-courses",
  DELETECOURSEBYID: "/delete-course",
  CREATECOURSE: "/create-course",
  EDITCOURSEBYID: "/edit-course",
};

export const API_LAYOUT_PATHS = {
  GETLAYOUTTYPE: "/get-layout",
  EDITLAYOUT: "/edit-layout",
};

export const API_ORDER_PATHS = {
  PAYMENTINTENT: "/payment",
  STRIPEPUBLISHABLEKEY: "/payment/stripe-publishable-key",
  CREATEORDER: "/create-order",
};

export const API_NOTIFICATION_PATHS = {
  UPDATENOTIFCATIONSTATUS: "/update-notification-status",
  GETALLNOTIFCATIONS: "/get-all-notifications",
};

export const API_ANALYTICS_PATHS = {
  GETORDERSANALYTICS: "/get-orders-analytics",
  GETUSERSANALYTICS: "/get-users-analytics",
  GETCOURSESANALYTICS: "/get-courses-analytics",
};
