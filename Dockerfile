# pull official base image
FROM node:12.10.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./

RUN npm install react-scripts -g
RUN npm install

# add app
COPY . ./

#expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]