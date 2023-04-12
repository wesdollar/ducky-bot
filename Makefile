include .env

# Define variables
PS_DB_NAME?=ducky-chat
PS_USER_NAME?=DB_USERNAME
PS_USER_PASSWORD?=DB_PASSWORD


.PHONY: create-db create-user init-db deploy-migrations start-server

# Create the database on PlanetScale
create-db:
	pscale create database $(PS_DB_NAME)

# Create a new user for the database
create-user:
	pscale create user $(PS_USER_NAME) --password $(PS_USER_PASSWORD) --database $(PS_DB_NAME)

# Initialize a new Prisma project
init-db:
	pscale init

# Deploy migrations to the database
deploy-migrations:
	prisma migrate deploy

# Start the Prisma server
start-server:
	prisma generate && prisma run

# Deploy the database to PlanetScale
deploy: create-db create-user init-db deploy-migrations start-server
