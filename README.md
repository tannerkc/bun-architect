# architect
Quickly generate project structures and files

`note: this probably exists in a million modules but I just quickly threw this together for my own purposes. It probably won't be maintained but contributions are welcome.`

```bash
yarn global add bun-architect
```

To run:

```bash
architect --structure '{"src":["utils", "services/firebase", "services/mariadb", "services/workers", "routes"]}'
```

```bash
architect src/index.js src/css/main.css --structure '{"src/assets":["media/img", "media/video", "fonts"]}'
```

This project was created using `bun init` in bun v1.0.27. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

`This won't run unless you got bun, hun`