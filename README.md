# FitLog — Workout & Gym Companion

A modern dark-themed workout tracking web application built with Next.js,TypeScript and Tailwind CSS.FitLog allows users to explore workout libraries,build daily exercise plans,save favorites and track their fitness journey with real-time stats and local persistence.

*Live Site: [https://fit-log-dun-chi.vercel.app](https://fit-log-dun-chi.vercel.app)
*Repository: [https://github.com/mushfiq-khan/fit-log](https://github.com/mushfiq-khan/fit-log)

# Technologies Used

*Framework: Next.js (App Router)
*Language: TypeScript
*Styling: Tailwind CSS
*State Management: React Context API (`PlanContext`)
*Data Persistence: Browser `localStorage`
*Icons & UI: Custom Icons,Custom Toast Notifications

# Key Features

1. Interactive Workout Library: Browse 12+ workouts with category badges,duration,calorie estimates and equipment details presented in a responsive grid.
2. Dynamic Plan & Saved Lists: Decoupled dual-list system allowing users to independently manage "Today's Plan" and "Saved Workouts".
3. Smart Sorting Logic: Multi-criteria sorting that orders duration and calories in descending order (High to Low) and ratings in ascending order (Low to High).
4. Live Metrics Dashboard: Real-time metrics tracking for total planned exercises,accumulated workout minutes and target calories burned.
5. Local Storage Persistence & Custom Toast System: Saves all selections locally so data survives page reloads,accompanied by custom floating toast notifications for user interactions.