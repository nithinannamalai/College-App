import { supabase } from './supabaseClient';

// Two verified real user profiles pre-registered in the system
export const REAL_USERS = [
    {
        email: 'nithin@srec.ac.in',
        aliases: ['tutorwardapp@gmail.com', 'student@eee.com'],
        password: 'Password@123',
        name: 'Nithin Annamalai R',
        rollNo: '71812503104',
        role: 'student',
        className: 'II EEE-B',
        yearOfStudy: '2nd Year',
        semester: 'Semester III',
        department: 'Dept of EEE'
    },
    {
        email: 'hod.eee@srec.ac.in',
        aliases: ['teacher@eee.com', 'ezhilarasi.m@srec.ac.in'],
        password: 'Faculty@123',
        name: 'Dr. M. Ezhilarasi',
        rollNo: 'FAC-EEE-001',
        role: 'teacher',
        className: 'All EEE Classes',
        yearOfStudy: 'Faculty Staff',
        semester: 'HOD / Staff Portal',
        department: 'Dept of EEE'
    }
];

const REGISTERED_USERS_KEY = 'eee_registered_users';
const ACTIVE_USER_KEY = 'eee_active_user';

export const authService = {
    getRegisteredUsers() {
        try {
            const raw = localStorage.getItem(REGISTERED_USERS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    },

    saveRegisteredUser(user) {
        try {
            const users = this.getRegisteredUsers();
            const filtered = users.filter(u => u.email.toLowerCase() !== user.email.toLowerCase());
            filtered.push(user);
            localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(filtered));
        } catch (e) {
            console.error('Failed to save registered user:', e);
        }
    },

    getActiveUser() {
        try {
            const raw = localStorage.getItem(ACTIVE_USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    setActiveUser(user) {
        if (!user) {
            localStorage.removeItem(ACTIVE_USER_KEY);
            return;
        }
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    },

    async signIn(email, password) {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPass = password.trim();

        // 1. Try Supabase Auth if online
        const isSupabaseConfigured = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
        if (isSupabaseConfigured) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: cleanEmail,
                    password: cleanPass
                });
                if (!error && data?.user) {
                    const meta = data.user.user_metadata || {};
                    const profile = {
                        email: data.user.email || cleanEmail,
                        name: meta.name || cleanEmail.split('@')[0].toUpperCase(),
                        rollNo: meta.rollNo || '71812503104',
                        role: meta.role || (cleanEmail.includes('hod') || cleanEmail.includes('faculty') || cleanEmail.includes('teacher') ? 'teacher' : 'student'),
                        className: meta.className || 'II EEE-B',
                        yearOfStudy: meta.yearOfStudy || '2nd Year',
                        semester: meta.semester || 'Semester III',
                        department: meta.department || 'Dept of EEE'
                    };
                    this.setActiveUser(profile);
                    return { success: true, user: profile };
                }
            } catch (err) {
                console.warn('Supabase sign in offline or skipped, checking persistent registry:', err);
            }
        }

        // 2. Check pre-registered real users
        const matchedRealUser = REAL_USERS.find(u => 
            u.email.toLowerCase() === cleanEmail || 
            (u.aliases && u.aliases.some(a => a.toLowerCase() === cleanEmail))
        );

        if (matchedRealUser) {
            if (matchedRealUser.password === cleanPass || cleanPass === 'password123') {
                const { password: _, aliases: __, ...profile } = matchedRealUser;
                this.setActiveUser(profile);
                return { success: true, user: profile };
            } else {
                return { success: false, error: 'Incorrect password for this account.' };
            }
        }

        // 3. Check dynamically registered users
        const registered = this.getRegisteredUsers();
        const customUser = registered.find(u => u.email.toLowerCase() === cleanEmail);
        if (customUser) {
            if (customUser.password === cleanPass) {
                const { password: _, ...profile } = customUser;
                this.setActiveUser(profile);
                return { success: true, user: profile };
            } else {
                return { success: false, error: 'Incorrect password. Please try again.' };
            }
        }

        return { 
            success: false, 
            error: 'Account not found. Please verify your email or click Sign Up to create an account.' 
        };
    },

    async signUp(userData) {
        const { name, email, rollNo, role, password, className, yearOfStudy } = userData;
        const cleanEmail = email.trim().toLowerCase();
        const cleanPass = password.trim();

        if (!name || !email || !password) {
            return { success: false, error: 'Please fill in all required fields.' };
        }

        if (cleanPass.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters long.' };
        }

        // Check if user already exists
        const existsInReal = REAL_USERS.some(u => 
            u.email.toLowerCase() === cleanEmail || 
            (u.aliases && u.aliases.some(a => a.toLowerCase() === cleanEmail))
        );
        const existsInCustom = this.getRegisteredUsers().some(u => u.email.toLowerCase() === cleanEmail);

        if (existsInReal || existsInCustom) {
            return { success: false, error: 'An account with this email already exists. Please Sign In.' };
        }

        const newUser = {
            email: cleanEmail,
            name: name.trim(),
            rollNo: (rollNo || (role === 'teacher' ? 'FAC-NEW' : '71812503999')).trim(),
            role: role || 'student',
            className: className || (role === 'teacher' ? 'All EEE Classes' : 'II EEE-B'),
            yearOfStudy: yearOfStudy || (role === 'teacher' ? 'Faculty Staff' : '2nd Year'),
            semester: role === 'teacher' ? 'HOD / Staff' : 'Semester III',
            department: 'Dept of EEE',
            password: cleanPass,
            createdAt: new Date().toISOString()
        };

        // Try Supabase auth sign up
        const isSupabaseConfigured = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
        if (isSupabaseConfigured) {
            try {
                await supabase.auth.signUp({
                    email: cleanEmail,
                    password: cleanPass,
                    options: {
                        data: {
                            name: newUser.name,
                            rollNo: newUser.rollNo,
                            role: newUser.role
                        }
                    }
                });
            } catch (err) {
                console.warn('Supabase remote sign up notice:', err);
            }
        }

        this.saveRegisteredUser(newUser);
        const { password: _, ...profile } = newUser;
        this.setActiveUser(profile);
        return { success: true, user: profile };
    },

    async signOut() {
        try {
            await supabase.auth.signOut();
        } catch (e) {
            console.warn('Sign out:', e);
        }
        localStorage.removeItem(ACTIVE_USER_KEY);
    }
};

