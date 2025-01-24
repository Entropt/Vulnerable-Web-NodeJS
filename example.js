const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked'); // You'll need to install 'marked' package

const PORT = 8080;
const POSTS_DIR = path.join(__dirname, 'posts');
const STATIC_DIR = path.join(__dirname, 'static');

const server = http.createServer(async (req, res) => {
  try {
    // Serve static files
    if (req.url.startsWith('/static/')) {
      const filePath = path.join(STATIC_DIR, req.url.replace('/static/', ''));
      const data = await fs.readFile(filePath);
      const ext = path.extname(filePath);
      const contentType = {
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png'
      }[ext] || 'text/plain';

      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(data);
    }

    // Handle routes
    switch (req.url) {
      case '/':
        await handleHome(req, res);
        break;

      case '/create-post':
        if (req.method === 'POST') {
          await handleCreatePost(req, res);
        } else {
          await handleCreatePostForm(req, res);
        }
        break;

      default:
        if (req.url.match(/^\/post\//)) {
          await handlePost(req, res);
        } else {
          res.writeHead(404);
          res.end('Page not found');
        }
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

async function handleHome(req, res) {
  const files = await fs.readdir(POSTS_DIR);
  const posts = files.filter(file => file.endsWith('.md'));

  const postList = posts.map(post => {
    const id = post.replace('.md', '');
    return `<li><a href="/post/${id}">${id}</a></li>`;
  }).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Blog</title>
        <link rel="stylesheet" href="/static/style.css">
      </head>
      <body>
        <h1>Welcome to My Blog</h1>
        <ul>${postList}</ul>
        <a href="/create-post">Create New Post</a>
      </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

async function handlePost(req, res) {
  const postId = req.url.split('/post/')[1];
  const filePath = path.join(POSTS_DIR, `${postId}.md`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const [title, ...content] = data.split('\n');
    const htmlContent = marked(content.join('\n'));

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <link rel="stylesheet" href="/static/style.css">
        </head>
        <body>
          <h1>${title}</h1>
          <div>${htmlContent}</div>
          <a href="/">Back to Home</a>
        </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } catch (err) {
    res.writeHead(404);
    res.end('Post not found');
  }
}

async function handleCreatePostForm(req, res) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Create New Post</title>
        <link rel="stylesheet" href="/static/style.css">
      </head>
      <body>
        <h1>Create New Post</h1>
        <form method="POST" action="/create-post">
          <input type="text" name="title" placeholder="Post Title" required>
          <textarea name="content" placeholder="Post Content (Markdown)" required></textarea>
          <button type="submit">Create Post</button>
        </form>
      </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

async function handleCreatePost(req, res) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }

  const params = new URLSearchParams(body);
  const title = params.get('title');
  const content = params.get('content');

  const postId = Date.now();
  const fileContent = `${title}\n${content}`;
  await fs.writeFile(path.join(POSTS_DIR, `${postId}.md`), fileContent);

  res.writeHead(302, { 'Location': '/' });
  res.end();
}

async function initialize() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.mkdir(STATIC_DIR, { recursive: true });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

initialize();