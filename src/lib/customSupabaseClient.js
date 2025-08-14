import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://socdnkzhkzlajdygzdmq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvY2Rua3poa3psYWpkeWd6ZG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMjAxNzYsImV4cCI6MjA3MDU5NjE3Nn0.YkVfBu_MGUp6sPOqaDtl425uPNWMMHnnklO4xkh1N0U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);