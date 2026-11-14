---
name: aktar
description: Upload files to the user's own S3, Cloudflare R2 or Backblaze B2 bucket with the Aktar MCP tools and get shareable links, search past uploads, make short or temporary links, or browse a bucket. Use when the user asks to upload, share, host or get a link for a file, screenshot, build or log, or to put an image in Markdown.
---

# Aktar

The `aktar` MCP server uploads through the Aktar app running on this Mac or Windows PC. Aktar holds the storage keys and applies each destination's settings (path template, image conversion, link shortener), so you only pass files.

## Before anything

Call `get_status`. If it fails, tell the user what to do; never ask for the token in chat:

- Aktar isn't running or not connected: open Aktar, turn on Settings > Integrations > Allow local connections, then run `npx @getaktar/cli login` in a terminal and paste the token.
- The app couldn't prove it's Aktar, or asks for an update: update Aktar (Mac 0.18.0 or Windows 0.11.0 or later), or run the login again if the token changed.

## Uploading publishes the file

Anyone with the link can open an uploaded file. Only upload what the user asked to share. The server refuses secrets (SSH and private keys, `.env` files, cloud credentials) and files outside the folder it runs in; don't try to work around that.

## Tools

- `upload_file`: upload a file by path. Optional `destination`, `name`, `folder`, `expires` (1, 7, 14 or 30 days) and `short`. Returns the link, Markdown and HTML.
- `upload_clipboard`: upload the file or image on the clipboard.
- `search_uploads`: find past uploads by file name or key.
- `create_short_link`: a short link for an upload, from its destination's link shortener.
- `create_temporary_link`: a link that stops working after a while. Anyone with it can download the file until then, even from a private bucket, so only make one when asked.
- `list_destinations`, `list_bucket`, `get_thumbnail`, `list_watched_folders`, `get_status`.
- `replace_file` and `delete_upload` exist only when the user turned them on; they change or remove files for good, so confirm first.

## Giving the link

Prefer the short link when the result has one. For Markdown or HTML, use the `formats` the tool returns. If the result says `reused: true`, the same file was already in the bucket and its existing link came back; that's expected.

## Choosing a destination

Leave `destination` out unless the user names one: Aktar picks the destination whose file types match, or the selected one. Names come from `list_destinations`.
