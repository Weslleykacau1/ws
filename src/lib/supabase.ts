
import { createClient } from '@supabase/supabase-js'

// TODO: É altamente recomendável mover estas chaves para variáveis de ambiente (.env.local) por segurança.
const supabaseUrl = "https://ysqwkehabnlzpktpuaia.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcXdrZWhhYm5senBrdHB1YWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTUxNDQsImV4cCI6MjA2ODA3MTE0NH0.mrlUkLd4xb8y6LFFk0U3waFEU067zfA2J9liySJ8Srw"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
