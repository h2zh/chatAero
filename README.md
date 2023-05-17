# ChatAero

Author: Howard Zhong

## Introduction

ChatAero is a new AI aviation message decoder based on the GPT model built for professionals and enthusiasts. With ChatAero, you can translate one or more NOTAM, METAR, TAF, AFTN, SITA messages on one seamless page.

## Getting Started

First, create a `.env.local` based on `.env.sample` and paste your private keys

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to mess with this website.

## How does it work or How could this project help you build your own GPT app

ChatAero is built with Next.js and styled with Material UI. Meticulous prompts are embedded in the RESTful APIs to get JSON response from the GPT model. Then the JSON data is fetched on the client-side and parsed on the top of a static generation chatbox interface. Redux is integrated into this app for efficient state management of chat history and Thunk is leveraged for handle async Firebase user auth. If you want to create your own GPT app, I hope my work could spark your ideas :D

## Developer Story

As a person with cross-disciplinary experience in both computer science and aviation, I noticed the power of large language models could fill the gap in aviation messages parsing. chatAero is the first NOTAM decoder that understand the (E) item. I worked closely with pilots, air traffic controllers, dispatchers, and aviation enthusiasts in the UX design of chatAero, ensuring that it tailors to different usage scenarios in the aviation community. Taking the NOTAM decoder as an example again, it indicates whether it is currently active and displays the time in both UTC and your local time zone. Plus, I’m continuously adding more features to make your aviation life easier.