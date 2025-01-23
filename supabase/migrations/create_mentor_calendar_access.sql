create table mentor_calendar_access (
  mentor_id uuid references profiles(id) primary key,
  access_token text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table mentor_calendar_access enable row level security;

create policy "Mentors can view their own calendar access"
  on mentor_calendar_access for select
  using (auth.uid() = mentor_id);

create policy "Mentors can update their own calendar access"
  on mentor_calendar_access for insert
  with check (auth.uid() = mentor_id);

create policy "Mentors can update their own calendar access"
  on mentor_calendar_access for update
  using (auth.uid() = mentor_id); 