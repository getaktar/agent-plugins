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

- It starts `npx -y @getaktar/cli@0.6.0 mcp`, which downloads that exact version of the CLI from npm.
- The server connects only to the Aktar app on your own computer (`127.0.0.1`). Before sending its token, it checks that the app on the port is really Aktar.
- Files you ask it to upload go from Aktar to your own bucket and become reachable by anyone with the link. Nothing is sent anywhere else.
- It uploads only from the folder the agent runs in, and never uploads secrets such as SSH keys, private keys, `.env` files or cloud credentials.
- Overwriting and deleting files are off. To turn them on, or to allow other folders, add the server yourself with `aktar mcp --allow-replace`, `--allow-delete` or `--root <folder>` as the [CLI README](https://github.com/getaktar/cli#mcp-server) shows.

## Tools

`upload_file`, `upload_clipboard`, `create_short_link`, `search_uploads`, `list_destinations`, `list_bucket`, `create_temporary_link`, `get_thumbnail`, `list_watched_folders`, `get_status`. With the flags above, also `replace_file` and `delete_upload`.

## License

MIT
