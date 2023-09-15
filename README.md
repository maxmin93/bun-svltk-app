# Bun &amp; SvelteKit

## 0. 개요

- [x] Bun &plus; SvelteKit (TS)
- [x] TailwindCSS
- [x] Drizzle ORM (postgresql)
- [x] Docker

> 화면 캡쳐

<img alt="bun-svltk-drizzle-app" src="./static/bun-svltk-drizzle-app.png?raw=true" width="400px" />

## 1. [Bun 설정](https://bun.sh/docs/typescript)

```console
$ brew tap oven-sh/bun 
$ brew install bun
$ bun upgrade

$ bun --version
1.0.1
```

### 설치 관리자 : 사용법이 pnpm 과 유사하다

macOS 의 외장 볼륨에 대해 설치가 안되는 문제가 있음 [(임시조치)](https://github.com/oven-sh/bun/issues/876#issuecomment-1326083788)

> 작업을 외장 볼륨에서 하고 있기 때문에, 불편하지만 bun add 이후 bun install 을 한번 더 해주면 된다.

```console
$ bun add figlet
$ bun add -d @types/figlet 

$ bun install
Failed to install 3 packages
error: Unexpected installing @types/figlet
error: Unexpected installing bun-types
error: Unexpected installing figlet

$ bun install --backend=copyfile
 3 packages installed [136.00ms]
```

## 2. [Bun &amp; SvelteKit](https://bun.sh/guides/ecosystem/sveltekit)

### 프로젝트 생성

```console
$ bun create svelte@latest my-app
$ cd my-app

$ bun install
# bun install --backend=copyfile

$ bun --bun run dev
```

### 빌드

- adapter-auto 를 adapter-bun 으로 변경
- 환경변수와 함께 `build/index.js 실행` (기본 3000 포트)

```console
$ bun add -D svelte-adapter-bun
# bun install --backend=copyfile

$ sed -i "" "s/@sveltejs\/adapter-auto/svelte-adapter-bun/" svelte.config.js

$ bun run build
> Using svelte-adapter-bun
  ✔ Start server with: bun ./build/index.js
  ✔ done
✓ built in 1.40s

$ PORT=8000 bun ./build/index.js
Listening on 0.0.0.0:8000
```

- Chrome 브라우저 오류 : [`Not found: /service-worker.js`](https://github.com/sveltejs/kit/issues/3159#issuecomment-1314986378)
  - [chrome://serviceworker-internals/](chrome://serviceworker-internals/) 에서 3000 포트에 대한 서비스 워커 호출을 해제

### Docker 배포 

```console
docker pull oven/bun

cat <<EOF > Dockerfile
FROM oven/bun
WORKDIR /app
COPY ./build .
EXPOSE 8000
ENV PORT 8000
CMD ["bun", "./index.js"]
EOF

docker run -it -P --rm bun-svltk-app bash
docker run -dP --rm --name bun-svltk-app bun-svltk-app
docker stop $(docker ps -lq)
```

#### docker-compose

- `.env` 에서 PORT 설정하고
- build 디렉토리를 마운트 해서, 바로 실행

```yml
version: "3"
services:
 bun_docker:
   image: oven/bun
   container_name: bun_docker
   command: ["bun", "/app/index.js"]
   env_file: .env
   ports:
     - ${PORT}:${PORT}
   working_dir: /app
   volumes:
     - type: bind
       source: ./build
       target: /app
   tty: true
```

```bash
docker compose up --build --no-recreate -d
docker compose up -d

docker compose ps

docker compose down -v
```


## 9. 참고문서

- [Drizzle ORM Quickstart Tutorial and First Impressions](https://tone-row.com/blog/drizzle-orm-quickstart-tutorial-first-impressions)
- [What is TypeScript SQL-like Drizzle ORM?](https://byby.dev/drizzle-orm)
  
&nbsp; <br />
&nbsp; <br />

> **끝!**
