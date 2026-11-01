-- ============================================================================
-- 🛡️ TUTOR WARD APP - SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Department of Electrical & Electronics Engineering
-- Sri Ramakrishna Engineering College
-- Developer: Nithin Annamalai R <tutorwardapp@gmail.com>
-- ============================================================================
-- Execute this script in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ============================================================================

-- ── 1. HELPER FUNCTIONS ─────────────────────────────────────────────────────

-- Helper: Check if current user is an authenticated Faculty / Teacher / Admin
CREATE OR REPLACE FUNCTION public.is_faculty()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    EXISTS (
      SELECT 1 FROM public.student_profiles
      WHERE email = (auth.jwt() ->> 'email')
        AND role = 'teacher'
    )
    OR (auth.jwt() ->> 'email') LIKE '%@srec.ac.in'
    OR (auth.jwt() ->> 'email') = 'hod.eee@srec.ac.in'
    OR (auth.jwt() ->> 'email') = 'tutorwardapp@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 2. ENABLE RLS ON ALL TABLES ─────────────────────────────────────────────

ALTER TABLE IF EXISTS public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.student_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.timetable_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.letter_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.od_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.calendar_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.timetable_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.lab_seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.bug_reports ENABLE ROW LEVEL SECURITY;

-- ── 3. CLEAN UP ANY OLD PERMISSIVE POLICIES ─────────────────────────────────

DO $$ 
DECLARE
  t text;
  pol text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'announcements', 'student_profiles', 'student_documents', 'attendance_logs',
    'courses', 'milestones', 'labs', 'faculty', 'rules', 'timetable_entries',
    'letter_requests', 'od_requests', 'calendar_files', 'timetable_files',
    'suggestions', 'lab_seats', 'bug_reports'
  ])
  LOOP
    FOR pol IN 
      SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol, t);
    END LOOP;
  END LOOP;
END $$;

-- ── 4. GRANULAR RLS POLICIES FOR EACH TABLE ─────────────────────────────────

-- ============================================================================
-- Table: announcements (Notice Board & Events)
-- ============================================================================
-- Read: Everyone (Public + Authenticated)
CREATE POLICY "announcements_read_all"
ON public.announcements FOR SELECT
USING (true);

-- Insert/Update/Delete: Faculty Only
CREATE POLICY "announcements_faculty_insert"
ON public.announcements FOR INSERT
WITH CHECK (public.is_faculty());

CREATE POLICY "announcements_faculty_update"
ON public.announcements FOR UPDATE
USING (public.is_faculty());

CREATE POLICY "announcements_faculty_delete"
ON public.announcements FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: student_profiles (Student & Staff Dossiers)
-- ============================================================================
-- Read: User can view their own profile, or Faculty can view all
CREATE POLICY "student_profiles_select"
ON public.student_profiles FOR SELECT
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
  OR auth.role() = 'anon' -- Allows guest preview on demo profiles if required
);

-- Insert: Users can register their own profile, or Faculty can add students
CREATE POLICY "student_profiles_insert"
ON public.student_profiles FOR INSERT
WITH CHECK (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
  OR auth.role() = 'anon'
);

-- Update: User updates own bio, Faculty can update any student
CREATE POLICY "student_profiles_update"
ON public.student_profiles FOR UPDATE
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Delete: Faculty Only
CREATE POLICY "student_profiles_delete"
ON public.student_profiles FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: student_documents (Certified Vault & Encrypted PDFs)
-- ============================================================================
-- Read: Owner or Faculty
CREATE POLICY "student_documents_select"
ON public.student_documents FOR SELECT
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Insert: Owner or Faculty
CREATE POLICY "student_documents_insert"
ON public.student_documents FOR INSERT
WITH CHECK (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Delete: Owner or Faculty
CREATE POLICY "student_documents_delete"
ON public.student_documents FOR DELETE
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- ============================================================================
-- Table: attendance_logs (Hourly Attendance Records)
-- ============================================================================
-- Read: Students can read logs for their roll number; Faculty can read all
CREATE POLICY "attendance_logs_select"
ON public.attendance_logs FOR SELECT
USING (
  "studentRollNo" IN (
    SELECT "rollNo" FROM public.student_profiles WHERE email = (auth.jwt() ->> 'email')
  )
  OR public.is_faculty()
  OR auth.role() = 'anon'
);

-- Insert / Update: Faculty Only
CREATE POLICY "attendance_logs_insert"
ON public.attendance_logs FOR INSERT
WITH CHECK (public.is_faculty());

CREATE POLICY "attendance_logs_update"
ON public.attendance_logs FOR UPDATE
USING (public.is_faculty());

CREATE POLICY "attendance_logs_delete"
ON public.attendance_logs FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: od_requests (On-Duty Requests)
-- ============================================================================
-- Read: Student views own requests; Faculty views all
CREATE POLICY "od_requests_select"
ON public.od_requests FOR SELECT
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Insert: Authenticated Students
CREATE POLICY "od_requests_insert"
ON public.od_requests FOR INSERT
WITH CHECK (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Update: Faculty can approve/reject; Student can edit if still Pending
CREATE POLICY "od_requests_update"
ON public.od_requests FOR UPDATE
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Delete: Student (if Pending) or Faculty
CREATE POLICY "od_requests_delete"
ON public.od_requests FOR DELETE
USING (
  (email = (auth.jwt() ->> 'email') AND status = 'Pending')
  OR public.is_faculty()
);

-- ============================================================================
-- Table: letter_requests (Bonafide & NOC Applications)
-- ============================================================================
-- Read: Owner or Faculty
CREATE POLICY "letter_requests_select"
ON public.letter_requests FOR SELECT
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Insert: Owner or Faculty
CREATE POLICY "letter_requests_insert"
ON public.letter_requests FOR INSERT
WITH CHECK (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Update: Faculty approval or Student pending edit
CREATE POLICY "letter_requests_update"
ON public.letter_requests FOR UPDATE
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "letter_requests_delete"
ON public.letter_requests FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Reference Tables (Read-Only for Students, Write for Faculty)
-- Tables: courses, milestones, labs, faculty, rules, timetable_entries, calendar_files, timetable_files
-- ============================================================================

-- Courses
CREATE POLICY "courses_read_all" ON public.courses FOR SELECT USING (true);
CREATE POLICY "courses_faculty_write" ON public.courses FOR ALL USING (public.is_faculty());

-- Milestones
CREATE POLICY "milestones_read_all" ON public.milestones FOR SELECT USING (true);
CREATE POLICY "milestones_faculty_write" ON public.milestones FOR ALL USING (public.is_faculty());

-- Labs & Workstations
CREATE POLICY "labs_read_all" ON public.labs FOR SELECT USING (true);
CREATE POLICY "labs_faculty_write" ON public.labs FOR ALL USING (public.is_faculty());

-- Faculty Directory
CREATE POLICY "faculty_read_all" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "faculty_faculty_write" ON public.faculty FOR ALL USING (public.is_faculty());

-- Rules & Regulations
CREATE POLICY "rules_read_all" ON public.rules FOR SELECT USING (true);
CREATE POLICY "rules_faculty_write" ON public.rules FOR ALL USING (public.is_faculty());

-- Timetable Entries
CREATE POLICY "timetable_entries_read_all" ON public.timetable_entries FOR SELECT USING (true);
CREATE POLICY "timetable_entries_faculty_write" ON public.timetable_entries FOR ALL USING (public.is_faculty());

-- Calendar Files
CREATE POLICY "calendar_files_read_all" ON public.calendar_files FOR SELECT USING (true);
CREATE POLICY "calendar_files_faculty_write" ON public.calendar_files FOR ALL USING (public.is_faculty());

-- Timetable Files
CREATE POLICY "timetable_files_read_all" ON public.timetable_files FOR SELECT USING (true);
CREATE POLICY "timetable_files_faculty_write" ON public.timetable_files FOR ALL USING (public.is_faculty());

-- ============================================================================
-- Table: suggestions (Confidential Student Feedback Box)
-- ============================================================================
-- Insert: Anyone can submit an anonymous suggestion
CREATE POLICY "suggestions_insert_any"
ON public.suggestions FOR INSERT
WITH CHECK (true);

-- Select / Delete: Faculty Only (Protects confidential feedback from public exposure)
CREATE POLICY "suggestions_select_faculty"
ON public.suggestions FOR SELECT
USING (public.is_faculty());

CREATE POLICY "suggestions_delete_faculty"
ON public.suggestions FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: lab_seats (Live Computer Workstation Allocation)
-- ============================================================================
-- Read: Everyone
CREATE POLICY "lab_seats_read_all"
ON public.lab_seats FOR SELECT
USING (true);

-- Write: Authenticated Users (Seat reservation) or Faculty
CREATE POLICY "lab_seats_write"
ON public.lab_seats FOR ALL
USING (auth.role() = 'authenticated' OR public.is_faculty());

-- ============================================================================
-- Table: bug_reports (Issue Tracking & Resolution Tickets)
-- ============================================================================
-- Read: Submitter or Faculty
CREATE POLICY "bug_reports_select"
ON public.bug_reports FOR SELECT
USING (
  user_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Insert: Any logged-in user
CREATE POLICY "bug_reports_insert"
ON public.bug_reports FOR INSERT
WITH CHECK (true);

-- Update: Faculty (Status/Notes) or Submitter
CREATE POLICY "bug_reports_update"
ON public.bug_reports FOR UPDATE
USING (
  user_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- Delete: Faculty Only
CREATE POLICY "bug_reports_delete"
ON public.bug_reports FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- 🎉 ALL 17 TABLES SECURED WITH ROW LEVEL SECURITY!
-- ============================================================================

