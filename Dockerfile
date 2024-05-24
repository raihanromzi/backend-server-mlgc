FROM node:buster-slim

ENV NODE_ENV=production
ENV PORT=8080
ENV MODEL_URL='https://storage.googleapis.com/model_ml_dicodingsubmission_tutorial/model.json'

COPY . .

RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "prod" ]
