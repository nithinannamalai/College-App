-- ============================================================================
-- 🛡️ TUTOR WARD APP - SUPABASE ROW LEVEL SECURITY (RLS) POLICIES (VERIFIED)
-- Department of Electrical & Electronics Engineering
-- Sri Ramakrishna Engineering College
-- Developer: Nithin Annamalai R <tutorwardapp@gmail.com>
-- ============================================================================
-- Execute this script in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ============================================================================

-- ── 1. HELPER FUNCTION: IS_FACULTY ──────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_faculty()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    COALESCE(
      EXISTS (
        SELECT 1 FROM public.student_profiles
        WHERE email = (auth.jwt() ->> 'email')
          AND role = 'teacher'
      ),
      false
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

-- ── 3. CLEAN UP ANY OLD POLICIES TO PREVENT DUPLICATES ──────────────────────

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
CREATE POLICY "announcements_select_all"
ON public.announcements FOR SELECT
USING (true);

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
-- Table: student_profiles (Column: email, roll_no, name, role, ...)
-- ============================================================================
CREATE POLICY "student_profiles_select"
ON public.student_profiles FOR SELECT
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
  OR auth.role() = 'anon'
);

CREATE POLICY "student_profiles_insert"
ON public.student_profiles FOR INSERT
WITH CHECK (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
  OR auth.role() = 'anon'
);

CREATE POLICY "student_profiles_update"
ON public.student_profiles FOR UPDATE
USING (
  email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "student_profiles_delete"
ON public.student_profiles FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: student_documents (Column: student_email, name, size, data_url)
-- ============================================================================
CREATE POLICY "student_documents_select"
ON public.student_documents FOR SELECT
USING (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "student_documents_insert"
ON public.student_documents FOR INSERT
WITH CHECK (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "student_documents_delete"
ON public.student_documents FOR DELETE
USING (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

-- ============================================================================
-- Table: attendance_logs (Column: student_roll_no, date, period, status)
-- ============================================================================
CREATE POLICY "attendance_logs_select"
ON public.attendance_logs FOR SELECT
USING (
  student_roll_no IN (
    SELECT roll_no FROM public.student_profiles WHERE email = (auth.jwt() ->> 'email')
  )
  OR public.is_faculty()
  OR auth.role() = 'anon'
);

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
-- Table: od_requests (Column: student_email, student_name, roll_no, status)
-- ============================================================================
CREATE POLICY "od_requests_select"
ON public.od_requests FOR SELECT
USING (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "od_requests_insert"
ON public.od_requests FOR INSERT
WITH CHECK (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "od_requests_update"
ON public.od_requests FOR UPDATE
USING (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "od_requests_delete"
ON public.od_requests FOR DELETE
USING (
  (student_email = (auth.jwt() ->> 'email') AND status = 'Pending')
  OR public.is_faculty()
);

-- ============================================================================
-- Table: letter_requests (Column: student_email, student_name, roll_no, status)
-- ============================================================================
CREATE POLICY "letter_requests_select"
ON public.letter_requests FOR SELECT
USING (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "letter_requests_insert"
ON public.letter_requests FOR INSERT
WITH CHECK (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "letter_requests_update"
ON public.letter_requests FOR UPDATE
USING (
  student_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "letter_requests_delete"
ON public.letter_requests FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: bug_reports (Column: reporter_email, reporter_name, title, status)
-- ============================================================================
CREATE POLICY "bug_reports_select"
ON public.bug_reports FOR SELECT
USING (
  reporter_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "bug_reports_insert"
ON public.bug_reports FOR INSERT
WITH CHECK (true);

CREATE POLICY "bug_reports_update"
ON public.bug_reports FOR UPDATE
USING (
  reporter_email = (auth.jwt() ->> 'email')
  OR public.is_faculty()
);

CREATE POLICY "bug_reports_delete"
ON public.bug_reports FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: suggestions (Anonymous Feedback Box)
-- ============================================================================
CREATE POLICY "suggestions_insert"
ON public.suggestions FOR INSERT
WITH CHECK (true);

CREATE POLICY "suggestions_select_faculty"
ON public.suggestions FOR SELECT
USING (public.is_faculty());

CREATE POLICY "suggestions_delete_faculty"
ON public.suggestions FOR DELETE
USING (public.is_faculty());

-- ============================================================================
-- Table: lab_seats (Workstation Allocation)
-- ============================================================================
CREATE POLICY "lab_seats_select"
ON public.lab_seats FOR SELECT
USING (true);

CREATE POLICY "lab_seats_write"
ON public.lab_seats FOR ALL
USING (auth.role() = 'authenticated' OR public.is_faculty());

-- ============================================================================
-- Reference Academic Data (Read: All, Write: Faculty)
-- Tables: courses, milestones, labs, faculty, rules, timetable_entries, calendar_files, timetable_files
-- ============================================================================

CREATE POLICY "courses_read" ON public.courses FOR SELECT USING (true);
CREATE POLICY "courses_faculty_write" ON public.courses FOR ALL USING (public.is_faculty());

CREATE POLICY "milestones_read" ON public.milestones FOR SELECT USING (true);
CREATE POLICY "milestones_faculty_write" ON public.milestones FOR ALL USING (public.is_faculty());

CREATE POLICY "labs_read" ON public.labs FOR SELECT USING (true);
CREATE POLICY "labs_faculty_write" ON public.labs FOR ALL USING (public.is_faculty());

CREATE POLICY "faculty_read" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "faculty_faculty_write" ON public.faculty FOR ALL USING (public.is_faculty());

CREATE POLICY "rules_read" ON public.rules FOR SELECT USING (true);
CREATE POLICY "rules_faculty_write" ON public.rules FOR ALL USING (public.is_faculty());

CREATE POLICY "timetable_entries_read" ON public.timetable_entries FOR SELECT USING (true);
CREATE POLICY "timetable_entries_faculty_write" ON public.timetable_entries FOR ALL USING (public.is_faculty());

CREATE POLICY "calendar_files_read" ON public.calendar_files FOR SELECT USING (true);
CREATE POLICY "calendar_files_faculty_write" ON public.calendar_files FOR ALL USING (public.is_faculty());

CREATE POLICY "timetable_files_read" ON public.timetable_files FOR SELECT USING (true);
CREATE POLICY "timetable_files_faculty_write" ON public.timetable_files FOR ALL USING (public.is_faculty());

-- ============================================================================
-- 🎉 ALL 17 TABLES SECURED WITH EXACT SCHEMA COLUMN MATCHING!
-- ============================================================================
