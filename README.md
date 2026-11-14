<p align="center">
  <img src="assets/logo.png" alt="Aktar" width="96" height="96">
</p>

# Aktar for Claude, Cursor and Gemini CLI

Let your AI agent upload files to your own Amazon S3, Cloudflare R2 or Backblaze B2 bucket and hand you the link. It can also make short and temporary links, browse a bucket and search what you uploaded before.

This repository is a plugin for Claude, a plugin for Cursor and an extension for Gemini CLI. All three run the same MCP server, `aktar mcp`, from the [`@getaktar/cli`](https://github.com/getaktar/cli) npm package, and add a skill that tells the agent when and how to use it.

## Before you install

The server talks to the [Aktar](https://getaktar.com) app on your Mac or Windows PC, which holds your storage keys and settings. You set no API keys or environment variables in the plugin.

1. Install Aktar for Mac 0.18.0 or later, or Aktar for Windows 0.11.0 or later, and add a destination (your bucket).
2. In Aktar, open Settings > Integrations and turn on Allow local connections.
3. Run `npx @getaktar/cli login` once and paste the token shown there. You need Node.js 18 or later.

## Install

- **Claude Code:** `/plugin marketplace add getaktar/agent-plugins`, then `/plugin install aktar@aktar`.
- **Cursor:** install Aktar from the Cursor Marketplace.
- **Gemini CLI:** `gemini extensions install https://github.com/getaktar/agent-plugins`

## What it runs and sends

Nothing goes to the developer of Aktar. Here is everything the plugin runs, downloads and sends:

- **What it runs and downloads:** it starts `npx -y @getaktar/cli@0.6.0 mcp`, which downloads that exact version of the CLI from npm.
- **Local connection:** the MCP server connects only to the Aktar app on your own computer, at `127.0.0.1`, with the token that `aktar login` saved in a file only you can read (`~/.config/aktar/cli.json`, or `%APPDATA%\aktar\cli.json` on Windows; `aktar logout` deletes it). Before sending the token, it checks that the app on the port is really Aktar. Your storage access keys stay in the Aktar app and are never given to the plugin.
- **Your files and clipboard:** depending on the tool called, the server sends a file, or the file or image on your clipboard, to the Aktar app, which uploads it to the bucket you set up as a destination. These files can contain personal data, and an uploaded file can be opened by anyone with its link.
- **Optional link shortening:** if you set up a link shortener for a destination in Aktar and its settings or a tool call ask for a short link, the Aktar app sends the file's link to that shortening service.
- **What goes back to the AI tool:** depending on the tool called, file names, links, upload history, destination and bucket names, bucket listings and small preview images are returned to Claude, Cursor or Gemini CLI. How that tool processes and keeps them depends on its settings and its own privacy policy.
- **What is kept:** the connection file and Aktar's upload history stay on your device. The plugin keeps nothing else. How long uploaded files and short links are kept depends on your storage provider and your shortening service.
- **Limits:** it uploads only from the folder the agent runs in, and never uploads secrets such as SSH keys, private keys, `.env` files or cloud credentials. Overwriting and deleting files are off. To turn them on, to allow other folders, or to log every tool call to a local file (`--log`), add the server yourself with `aktar mcp --allow-replace`, `--allow-delete`, `--root <folder>` or `--log <file>` as the [CLI README](https://github.com/getaktar/cli#mcp-server) shows.

Full details are in the [Aktar privacy policy](https://getaktar.com/privacy/).

## Tools

`upload_file`, `upload_clipboard`, `create_short_link`, `search_uploads`, `list_destinations`, `list_bucket`, `create_temporary_link`, `get_thumbnail`, `list_watched_folders`, `get_status`. With the flags above, also `replace_file` and `delete_upload`.

## License

MIT
