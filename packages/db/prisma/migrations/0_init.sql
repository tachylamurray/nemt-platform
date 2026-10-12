-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create index for geospatial queries on vehicle locations
-- This will be added after the tables are created via Prisma migrate
