# ByWay E-Learning Platform 

_A modern and interactive e-learning platform_

🌐 Live Demo
Check out the live version here: [ByWay](https://e-learning-edu.onrender.com)

## 🚀 Technologies Used

- **Framework**: Next.js (v14+)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: JWT & OAuth
- **API Handling**: Axios
- **Payments**: Stripe
- **Media Storage**: Cloudinary
- **Notifications**: Socket.io

## 👆 Key Features

- User authentication (Students, Admins)
- Dynamic course listing & enrollment
- Secure checkout with Stripe integration
- User-friendly dashboard & profile management
- Interactive video player & progress tracking
- Real-time chat & notifications
- Fully responsive & accessible UI

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thobbytosin/by-way-client.git
   cd byway-e-learning-frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment Setup**
   ```bash
   Create .env file based on .env.example
   ```
4. **Run the application**
   ```bash
   npm run dev
   ```

## 📞 API Communication

- Uses Axios for handling API requests
- Secure authentication with JWT
- Data fetching with SWR for performance optimization

## 🌐 Routes & Pages

- User Endpoints

| Endpoint                          | Method | Description                         | Auth Required |
| --------------------------------- | ------ | ----------------------------------- | ------------- |
| /api/v1/registration              | POST   | User registration (Students, Admin) | No            |
| /api/v1/activate-user             | POST   | Account Activation                  | No            |
| /api/v1/login                     | POST   | User Login                          | No            |
| /api/v1/logout                    | GET    | User Signs Out                      | Yes           |
| /api/v1/refresh                   | GET    | Refresh tokens                      | Yes           |
| /api/v1/me                        | GET    | Fetch user details                  | Yes           |
| /api/v1/social-auth               | POST   | User Login (with social accounts)   | No            |
| /api/v1/update-user-info          | PUT    | Update User details                 | Yes           |
| /api/v1/update-user-password      | PUT    | Update User password                | Yes           |
| /api/v1/update-profile-picture    | PUT    | Update User Profile Picture         | Yes           |
| /api/v1//get-all-users            | GET    | Fetch all users                     | Yes (Admin)   |
| /api/v1/get-all-admins            | GET    | Fetch all admins                    | Yes (Admin)   |
| /api/v1/update-user-role          | PUT    | Update user roles                   | Yes (Admin)   |
| /api/v1/delete-user/:userId       | DELETE | Delete user account                 | Yes (Admin)   |
| /api/v1/update-user-videos-viewed | PUT    | Update viewed courses               | Yes           |
| /api/v1/get-users-latest          | GET    | User latest details                 | Yes           |

- Course Endpoints

| Endpoint                              | Method | Description                               | Auth Required |
| ------------------------------------- | ------ | ----------------------------------------- | ------------- |
| /api/v1/create-course                 | POST   | Upload Course (Admin)                     | Yes (Admin)   |
| /api/v1/edit-course/:course_id        | PUT    | Update Course (Admin)                     | Yes (Admin)   |
| /api/v1/get-course/:course_id         | GET    | Fetch a Course (not all details)          | No            |
| /api/v1/get-courses                   | GET    | Fetch all Courses (not all details)       | No            |
| /api/v1/get-course-content/:course_id | GET    | Fetch course data (Paid Users)            | Yes           |
| /api/v1/add-question                  | PUT    | Post question on a course (Paid Users)    | Yes           |
| /api/v1/add-answer                    | PUT    | Reply a question on a course (Paid Users) | Yes           |
| /api/v1/add-review/:course_id         | PUT    | Post a review (Paid Users)                | Yes           |
| /api/v1/add-reply-review              | PUT    | Reply a review (Admin)                    | Yes (Admin)   |
| /api/v1/get-all-courses               | GET    | Fetch all courses (Admin)                 | Yes (Admin)   |
| /api/v1/delete-course/:courseId       | DELETE | Delete a course (Admin)                   | Yes (Admin)   |

- Course Purchases Endpoints

| Endpoint                             | Method | Description                     | Auth Required |
| ------------------------------------ | ------ | ------------------------------- | ------------- |
| /api/v1/create-order                 | POST   | Create an Order                 | Yes           |
| /api/v1/get-all-orders               | GET    | Get all orders (Admin)          | Yes (Admin)   |
| /api/v1/payment/stripepublishablekey | GET    | Get Stripe Payment Key on order | Yes           |
| /api/v1/payment                      | POST   | User makes payment              | Yes           |

- Analytics Endpoints

| Endpoint                      | Method | Description                     | Auth Required |
| ----------------------------- | ------ | ------------------------------- | ------------- |
| /api/v1/get-users-analytics   | GET    | Fetch Users Analytics (Admin)   | Yes (Admin)   |
| /api/v1/get-courses-analytics | GET    | Fetch Courses Analytics (Admin) | Yes (Admin)   |
| /api/v1/get-orders-analytics  | GET    | Fetch Orders Analytics (Admin)  | Yes (Admin)   |

- Notifications Endpoints

| Endpoint                               | Method | Description                     | Auth Required |
| -------------------------------------- | ------ | ------------------------------- | ------------- |
| /api/v1/get-all-notifications          | GET    | Fetch all Notifications (Admin) | Yes (Admin)   |
| /api/v1/update-notification-status/:id | PUT    | Update a Notification (Admin)   | Yes (Admin)   |

- Layouts Endpoints (FAQS, HERO, CATEGORIES)

| Endpoint                 | Method | Description                | Auth Required |
| ------------------------ | ------ | -------------------------- | ------------- |
| /api/v1/create-layout    | POST   | Create Page layout (Admin) | Yes (Admin)   |
| /api/v1/edit-layout      | PUT    | Update Layout (Admin)      | Yes (Admin)   |
| /api/v1/get-layout/:type | GET    | Get a layoyut (Admin)      | Yes (Admin)   |

## 🚨 State Management

- **Redux Toolkit** for global state handling
- **Persisted state** for user sessions

## 🛠️ Component Structure

- **Reusable UI components** (buttons, modals, forms)
- **Lazy loading for better performance**
- **Dark mode support**

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/d3f0d549-7702-4375-bcec-2c32eaecd935)

![image](https://github.com/user-attachments/assets/d9a6d847-4acb-4ec7-87d8-727af40b02b8)

![image](https://github.com/user-attachments/assets/f529fc34-cf21-4d69-958e-df68dfc08321)

![image](https://github.com/user-attachments/assets/584c5f15-20cf-4fed-ab1f-88a19a88b571)

![image](https://github.com/user-attachments/assets/1f9e009d-8ae6-4642-9ead-b63833685350)




## 🎲 Contributing

- Fork the project
- Create your feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## 📚 License

Distributed under the MIT License. See LICENSE for more information.

## 📧 Contact

Project Maintainer - Falode Tobi  
Project Link: https://github.com/Thobbytosin/by-way-client.git
