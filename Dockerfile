FROM oven/bun
WORKDIR /app
COPY ./build .
# docker run -dP --rm bun-svltk-app
EXPOSE 8000
ENV PORT 8000
CMD ["bun", "./index.js"]