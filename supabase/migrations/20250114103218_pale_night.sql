/*
  # BusBuddy Initial Schema

  1. New Tables
    - `buses`
      - `id` (uuid, primary key)
      - `bus_number` (text)
      - `current_location` (jsonb)
      - `estimated_arrival` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `roll_number` (text)
      - `bus_id` (uuid, references buses)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `attendance`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references students)
      - `bus_id` (uuid, references buses)
      - `date` (date)
      - `status` (boolean)
      - `created_at` (timestamptz)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references students)
      - `bus_id` (uuid, references buses)
      - `driver_rating` (integer)
      - `punctuality_rating` (integer)
      - `comment` (text)
      - `created_at` (timestamptz)
    
    - `notifications`
      - `id` (uuid, primary key)
      - `type` (text)
      - `message` (text)
      - `bus_id` (uuid, references buses)
      - `created_at` (timestamptz)
    
    - `carbon_footprint`
      - `id` (uuid, primary key)
      - `bus_id` (uuid, references buses)
      - `date` (date)
      - `co2_reduction` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Buses Table
CREATE TABLE buses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_number text NOT NULL CHECK (bus_number ~ '^[1-9]$|^[1-3][0-9]$|^4[0-5]$'),
  current_location jsonb,
  estimated_arrival timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE buses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buses are viewable by authenticated users"
  ON buses FOR SELECT
  TO authenticated
  USING (true);

-- Students Table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  roll_number text NOT NULL,
  bus_id uuid REFERENCES buses,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own data"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Attendance Table
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students NOT NULL,
  bus_id uuid REFERENCES buses NOT NULL,
  date date DEFAULT CURRENT_DATE,
  status boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

-- Reviews Table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students NOT NULL,
  bus_id uuid REFERENCES buses NOT NULL,
  driver_rating integer CHECK (driver_rating BETWEEN 1 AND 5),
  punctuality_rating integer CHECK (punctuality_rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by authenticated users"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

-- Notifications Table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  message text NOT NULL,
  bus_id uuid REFERENCES buses,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Notifications are viewable by authenticated users"
  ON notifications FOR SELECT
  TO authenticated
  USING (true);

-- Carbon Footprint Table
CREATE TABLE carbon_footprint (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id uuid REFERENCES buses NOT NULL,
  date date DEFAULT CURRENT_DATE,
  co2_reduction numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE carbon_footprint ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Carbon footprint data is viewable by authenticated users"
  ON carbon_footprint FOR SELECT
  TO authenticated
  USING (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_buses_updated_at
  BEFORE UPDATE ON buses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();