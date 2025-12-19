# get node image
FROM node:alpine

# set working directory
WORKDIR /app/src

# copy package files into working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files into working directory
COPY . .

# run on port 3000
EXPOSE 3000

# command to run test
CMD [ "npm", "run", "test" ]