<div align="center">

# ⚡ Tutor Ward App · EEE Department Portal
### Smart Mobile, Desktop & Web Academic Management Hub
**Sri Ramakrishna Engineering College (SREC) · Department of Electrical & Electronics Engineering**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![Developer](https://img.shields.io/badge/Developer-Nithin%20Annamalai%20R-10b981.svg)](mailto:tutorwardapp@gmail.com)
[![Contact](https://img.shields.io/badge/Email-tutorwardapp%40gmail.com-ea580c.svg)](mailto:tutorwardapp@gmail.com)
[![React](https://img.shields.io/badge/React-19.2.7-61dafb.svg?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.2-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.4.1-119eff.svg?logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![Electron](https://img.shields.io/badge/Electron-43.1.0-47848F.svg?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Database](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

<br/>

<a href="https://github.com/nithinannamalai/College-App/raw/main/public/EEE-SREC-Portal.apk">
  <img src="https://img.shields.io/badge/📥_Download_Android_APK-Direct_Download_(30MB)-0052cc?style=for-the-badge&logo=android&logoColor=white" height="42" alt="Download APK" />
</a>

<br/><br/>

</div>

---

## 👨‍💻 Developer & Project Information

- **Application Name**: **Tutor Ward App**
- **Lead Developer**: **Nithin Annamalai R**
- **Developer Contact Email**: [**tutorwardapp@gmail.com**](mailto:tutorwardapp@gmail.com)
- **Institution**: Sri Ramakrishna Engineering College (SREC), Autonomous Institution Affiliated to Anna University, Coimbatore
- **Department**: Electrical & Electronics Engineering (EEE)
- **Official Repository**: [https://github.com/nithinannamalai/College-App.git](https://github.com/nithinannamalai/College-App.git)

---

## 📱 Direct Android Installation (.APK)

You can download and install the native Android APK directly on any Android smartphone:

- 🚀 **Direct Download Link**: [**Download EEE-SREC-Portal.apk**](https://github.com/nithinannamalai/College-App/raw/main/public/EEE-SREC-Portal.apk)
- **File Size**: ~30 MB
- **Target OS**: Android 8.0 (Oreo) through Android 15+
- **Offline Capable**: Fully functional offline with automated local storage caching and state persistence.

---

## 🖥️ ExploreScape Desktop Experience

On desktop monitors (>= 992px), **Tutor Ward App** features a majestic **ExploreScape** immersive parallax landscape:
- **Top Glassmorphic Floating Pill Navbar**: Clean curved navigation pill with backdrop blur (`#16423c` active states) and 1-click dev demo profile logins.
- **Multi-Layered Parallax Depth**: Smooth entrance animations with foreground and background terrain layers (`bac-1` through `bac-4`).
- **Interactive Department Showcase Slider**: Smooth chevron navigation cycling across Core Academic features, Attendance Analytics, Career Roadmaps, and AI Advisor.

---

## 🌟 Key Application Features

### 🎓 1. Academic Hub
- **CGPA & Grade Calculator**: Real-time SGPA calculation, semester grade radars, and cumulative CGPA projections.
- **Interactive Timetable**: Dynamic daily period schedules filtered by semester with faculty associations.
- **Official Academic Calendar**: Anna University milestone calendar with integrated CIA-1, CIA-2, practicals, and holiday schedules.
- **NPTEL & MOOC Tracker**: Registration tracking for SWAYAM / NPTEL certifications and exam deadlines.
- **Curriculum & Syllabus Explorer**: Comprehensive regulation course outlines and credit breakdowns.

### ⚡ 2. Student Services & Smart Utilities
- **Attendance & OD Tracker**: Period-by-period attendance tracking with automated on-duty (OD) percentage calculation.
- **Official Letter & OD Requests**: Bonafide, Leave, and On-Duty request forms with administrative workflow and PDF export.
- **Smart Lab & Seat Finder**: Laboratory seat allocations, system numbers, batch assignments, and supervisor schedules.
- **Confidential Suggestion Box**: Secure grievance submission directly forwarded to HOD & faculty administration.
- **Bug Reporting System**: Dedicated ticket reporting interface with severity tracking and administrative status management.
- **Career & Placement Radar**: Curated domain roadmaps (Core Electrical, EV Systems, Embedded Systems, IoT, Software).

### 🤖 3. AI Academic Tutor & Brain Games
- **EEE AI Chatbot**: Interactive engineering assistant for formula lookups, syllabus doubts, and concept explanations.
- **Mind & Brain Puzzles**: Circuit logic quizzes, pattern matching, and memory games designed for engineering students.

---

## 🛠️ Technology Stack

| Domain | Technology |
|---|---|
| **Frontend Core** | React 19, Modern JavaScript (ESNext), JSX |
| **Bundler & Build Tool** | Vite 8 + Rolldown / Oxc high-speed pipeline |
| **Styling & Effects** | Pure CSS3, ExploreScape Parallax Architecture, Glassmorphism, Responsive Mobile Shell |
| **Mobile Runtime** | Capacitor 8 (Native Android & iOS wrapper) |
| **Desktop Runtime** | Electron 43 + Electron Builder (Portable Windows binary) |
| **Database & Auth** | Supabase (PostgreSQL 15, Row Level Security, Secure Session JWT) |
| **Data Resiliency** | Zero-Crash Dual-Engine (Supabase remote sync + localStorage offline cache) |

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/nithinannamalai/College-App.git
cd College-App
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your Supabase URL and public publishable key:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Building Across Platforms

### Web Production Bundle
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

### Native Android (Capacitor)
```bash
npm run build
npx cap sync
npx cap open android
```

### Windows Desktop (Electron)
```bash
npm run electron:start   # Dev mode
npm run electron:build   # Build portable .exe
```

---

## 🔒 Security & Architecture Documentation

For in-depth architectural diagrams, database schemas, and developer standards, refer to:
- 📖 [**DEVELOPER.md**](DEVELOPER.md): Development guidelines, developer contact, and scripts.
- 🏛️ [**ARCHITECTURE.md**](ARCHITECTURE.md): System architecture diagrams, component trees, and RLS security matrices.

---

## 📄 License
This project is licensed under the MIT License. Developed by **Nithin Annamalai R** ([tutorwardapp@gmail.com](mailto:tutorwardapp@gmail.com)) for the Department of Electrical & Electronics Engineering, Sri Ramakrishna Engineering College.
